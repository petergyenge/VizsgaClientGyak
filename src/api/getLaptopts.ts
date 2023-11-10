import axios, { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

const client = axios.create({
  baseURL: "https://demoapi.com" 
});

const getLaptops = async (): Promise<AxiosResponse | null> => {
  try {
    const response = await client.get("/api/laptop");
    return response;
  } catch (error) {
    return (error as AxiosError).response || null;
  }
};

const Laptopschema = z.object({
    brand: z.string(),
    name: z.string(),
    weight: z.number()
});

export type Laptops = z.infer<typeof Laptopschema>;

const validateLaptops = (response: AxiosResponse): Laptops [] | null => {
  const result = Laptopschema.array().safeParse(response.data);
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

export const loadLaptops = async (): Promise<Response<Laptops []>> => {
  const response = await getLaptops();
  if (!response) return { success: false, status: 0 };
  if (response.status !== 200)
    return { success: false, status: response.status };
  const data = validateLaptops(response);
  if (!data) return { success: false, status: response.status };
  return { success: true, status: response.status, data };
};
