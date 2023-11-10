import axios, { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

const client = axios.create({
  baseURL: "https://demoapi.com" 
});

const getClothes = async (): Promise<AxiosResponse | null> => {
  try {
    const response = await client.get("/api/clothes");
    return response;
  } catch (error) {
    return (error as AxiosError).response || null;
  }
};

const Clotheschema = z.object({
  type: z.string(),
  gender: z.string(),
  products: z.object(
    {
      id: z.number(),
      brand: z.string(),
      color: z.string()
    }
  ).array(),
});


export type Clothes = z.infer<typeof Clotheschema>;

const validateClothes = (response: AxiosResponse): Clothes [] | null => {
  const result = Clotheschema.array().safeParse(response.data);
  if (!result.success) {
    console.log(result.error.issues);
    return null;
  }
  return result.data;
};

type Response<Type> =
  | {
      data: Type;
      status: number;
      success: true;
    }
  | {
      status: number;
      success: false;
    };

export const loadClothes = async (): Promise<Response<Clothes []>> => {
  const response = await getClothes();
  if (!response) return { success: false, status: 0 };
  if (response.status !== 200)
    return { success: false, status: response.status };
  const data = validateClothes(response);
  if (!data) return { success: false, status: response.status };
  return { success: true, status: response.status, data };
};
