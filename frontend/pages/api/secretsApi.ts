import axios from 'axios';
import { Isecret } from '@/components/SecretForm';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export interface secretValue {
  body: string;
  password: string;
  expiresIn: string;
}

interface IBody {
  password: string;
  secretId: string;
}

export interface Ipass {
  body: IBody;
}

export const postSecret = async (secrets: secretValue): Promise<Isecret> => {
  try {
    const response = await api.post('/secrets', secrets, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data.secret);
    return response.data.secret;
  } catch (err: any) {
    console.log(err.response);
    return Promise.reject(err.response.data.message);
  }
};

export const getSecret = async (id: string) => {
  try {
    const { data } = await api.get(`/private/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(data);
    return data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const shareSecret = async (body: Ipass) => {
  try {
    const { data } = await api.post(
      `/secret/${body.body.secretId}`,
      { password: body.body.password },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return data.secret;
  } catch (err: any) {
    return Promise.reject(err.response.data.message);
  }
};