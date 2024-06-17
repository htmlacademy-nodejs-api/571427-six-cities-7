import type { History } from 'history';
import type { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  UserAuth,
  User,
  Offer,
  Comment,
  CommentAuth,
  FavoriteAuth,
  UserRegister,
  NewOffer
} from '../types/types';
import { ApiRoute, AppRoute, HttpCode } from '../const';
import { Token } from '../utils';
import {
  commentAdapter,
  postOfferAdapter,
  listCommentAdapter,
  listOfferAdapter,
  offerAdapter
} from '../shared/adapter';

import type { CommentDto, OfferDto } from '../shared/dto';

type Extra = {
  api: AxiosInstance;
  history: History;
};

export const Action = {
  FETCH_OFFERS: 'offers/fetch',
  FETCH_OFFER: 'offer/fetch',
  POST_OFFER: 'offer/post-offer',
  EDIT_OFFER: 'offer/edit-offer',
  DELETE_OFFER: 'offer/delete-offer',
  FETCH_FAVORITE_OFFERS: 'offers/fetch-favorite',
  FETCH_PREMIUM_OFFERS: 'offers/fetch-premium',
  FETCH_COMMENTS: 'offer/fetch-comments',
  POST_COMMENT: 'offer/post-comment',
  POST_FAVORITE: 'offer/post-favorite',
  DELETE_FAVORITE: 'offer/delete-favorite',
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  REGISTER_USER: 'user/register'
};

export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  { extra: Extra }
>(Action.FETCH_OFFERS, async (_, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<OfferDto[]>(ApiRoute.Offers);

  return listOfferAdapter(data);
});

export const fetchFavoriteOffers = createAsyncThunk<
  Offer[],
  undefined,
  { extra: Extra }
>(Action.FETCH_FAVORITE_OFFERS, async (_, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<OfferDto[]>(
    `${ApiRoute.Offers}${ApiRoute.Favorite}`
  );

  return listOfferAdapter(data);
});

export const fetchOffer = createAsyncThunk<
  Offer,
  Offer['id'],
  { extra: Extra }
>(Action.FETCH_OFFER, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.get<OfferDto>(`${ApiRoute.Offers}/${id}`);

    return offerAdapter(data);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.NotFound) {
      history.push(AppRoute.NotFound);
    }

    return Promise.reject(error);
  }
});

export const postOffer = createAsyncThunk<Offer, NewOffer, { extra: Extra }>(
  Action.POST_OFFER,
  async (newOffer, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<OfferDto>(
      ApiRoute.Offers,
      postOfferAdapter(newOffer)
    );
    history.push(`${AppRoute.Property}/${data.id}`);

    return offerAdapter(data);
  }
);

export const editOffer = createAsyncThunk<Offer, Offer, { extra: Extra }>(
  Action.EDIT_OFFER,
  async (offer, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.patch<OfferDto>(
      `${ApiRoute.Offers}/${offer.id}`,
      { ...postOfferAdapter(offer), isFavorite: offer.isFavorite }
    );
    history.push(`${AppRoute.Property}/${data.id}`);

    return offerAdapter(data);
  }
);

export const deleteOffer = createAsyncThunk<void, string, { extra: Extra }>(
  Action.DELETE_OFFER,
  async (id, { extra }) => {
    const { api, history } = extra;
    await api.delete(`${ApiRoute.Offers}/${id}`);
    history.push(AppRoute.Root);
  }
);

export const fetchPremiumOffers = createAsyncThunk<
  Offer[],
  string,
  { extra: Extra }
>(Action.FETCH_PREMIUM_OFFERS, async (cityName, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<OfferDto[]>(
    `${ApiRoute.Offers}${ApiRoute.Premium}?city=${cityName}`
  );

  return listOfferAdapter(data);
});

export const fetchComments = createAsyncThunk<
  Comment[],
  Offer['id'],
  { extra: Extra }
>(Action.FETCH_COMMENTS, async (id, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<CommentDto[]>(
    `${ApiRoute.Offers}/${id}${ApiRoute.Comments}`
  );

  return listCommentAdapter(data);
});

export const fetchUserStatus = createAsyncThunk<
  UserAuth['email'],
  undefined,
  { extra: Extra }
>(Action.FETCH_USER_STATUS, async (_, { extra }) => {
  const { api } = extra;

  try {
    const { data } = await api.get<User>(`${ApiRoute.Users}${ApiRoute.Login}`);

    return data.email;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.NoAuth) {
      Token.drop();
    }

    return Promise.reject(error);
  }
});

export const loginUser = createAsyncThunk<
  UserAuth['email'],
  UserAuth,
  { extra: Extra }
>(Action.LOGIN_USER, async ({ email, password }, { extra }) => {
  const { api, history } = extra;
  const { data } = await api.post<User & { token: string }>(
    `${ApiRoute.Users}${ApiRoute.Login}`,
    {
      email,
      password
    }
  );
  const { token } = data;

  Token.save(token);
  history.push(AppRoute.Root);

  return email;
});

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  async () => {
    Token.drop();
  }
);

export const registerUser = createAsyncThunk<
  void,
  UserRegister,
  { extra: Extra }
>(
  Action.REGISTER_USER,
  async ({ email, password, name, avatar, type }, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<{ id: string }>(
      `${ApiRoute.Users}${ApiRoute.Register}`,
      {
        email,
        password,
        name,
        type
      }
    );
    if (avatar?.size) {
      const payload = new FormData();
      payload.append('avatar', avatar);

      const { data: loginData } = await api.post(
        `${ApiRoute.Users}${ApiRoute.Login}`,
        {
          email,
          password
        }
      );

      await api.post(
        `${ApiRoute.Users}/${data.id}${ApiRoute.Avatar}`,
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${loginData.token}`
          }
        }
      );
    }
    history.push(AppRoute.Login);
  }
);

export const postComment = createAsyncThunk<
  Comment,
  CommentAuth,
  { extra: Extra }
>(Action.POST_COMMENT, async ({ id, comment, rating }, { extra }) => {
  const { api } = extra;
  const { data } = await api.post<CommentDto>(
    `${ApiRoute.Offers}/${id}${ApiRoute.Comments}`,
    { text: comment, rating }
  );

  return commentAdapter(data);
});

export const postFavorite = createAsyncThunk<
  Offer,
  FavoriteAuth,
  { extra: Extra }
>(Action.POST_FAVORITE, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.post<OfferDto>(
      `${ApiRoute.Offers}${ApiRoute.Favorite}`,
      {
        offerId: id,
        isFavorite: true
      }
    );

    return offerAdapter(data);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.NoAuth) {
      history.push(AppRoute.Login);
    }

    return Promise.reject(error);
  }
});

export const deleteFavorite = createAsyncThunk<
  Offer,
  FavoriteAuth,
  { extra: Extra }
>(Action.DELETE_FAVORITE, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.post<OfferDto>(
      `${ApiRoute.Offers}${ApiRoute.Favorite}`,
      {
        offerId: id,
        isFavorite: false
      }
    );

    return offerAdapter(data);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.NoAuth) {
      history.push(AppRoute.Login);
    }

    return Promise.reject(error);
  }
});
