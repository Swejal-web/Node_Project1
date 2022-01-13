import axios from 'axios';
import { Isecret } from 'components/SecretForm';

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

// for creating a secret
export const postSecret = async (secrets: secretValue): Promise<Isecret> => {
  try {
    const response = await api.post('/secrets', secrets, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data.secret;
  } catch (err: any) {
    return Promise.reject(err.response.data.message);
  }
};

// for fetching secret by id
export const getSecret = async (id: string) => {
  try {
    const { data } = await api.get(`/private/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return data;
  } catch (err: any) {
    return err.response.data;
  }
};

// check for password and show the secret
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
