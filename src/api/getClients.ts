import axios, { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

const client = axios.create({
  baseURL: "https://demoapi.com" 
});

const getClient = async (name?: string): Promise<AxiosResponse | null> => {
  try {
    const response = await client.get("api/vet/clients", { params: {name: name}});
    console.log(response.data)
    return response;
  } catch (error) {
    return (error as AxiosError).response || null;
  }
};

const Clientchema = z.object({
    name: z.string(),
    pets: z.object(
      {
        name: z.string(),
        animal: z.string(),
        isVaccinated: z.boolean()
      }
    ).array(),
});

export type Clients = z.infer<typeof Clientchema>;

const validateClient = (response: AxiosResponse): Clients [] | null => {
  const result = Clientchema.array().safeParse(response.data);
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

export const loadClient = async (name?: string): Promise<Response<Clients []>> => {
  const response = await getClient(name);
  if (!response) return { success: false, status: 0 };
  if (response.status !== 200)
    return { success: false, status: response.status };
  const data = validateClient(response);
  if (!data) return { success: false, status: response.status };
  return { success: true, status: response.status, data };
};
