import axios, { AxiosError, AxiosResponse } from "axios"
import { z } from "zod"

const client = axios.create({
  baseURL: "https://demoapi.com" 
});

const _postPet = async (name: string, isVaccinated: boolean ): Promise<AxiosResponse | null> => {
  try {
    const response = await client.post("/api/vet/pets", { "name": name, "isVaccinated": isVaccinated})
    return response
  } catch (error) {
    return (error as AxiosError).response || null
  }
}

const PetSchema = z.object({
  name: z.string(),
  isVaccinated: z.boolean(),
})

export type Pet = z.infer<typeof PetSchema>

const validatePet = (response: AxiosResponse): Pet | null => {
  const result = PetSchema.safeParse(response.data)
  if (!result.success) {
    return null
  }
  return result.data
}

type Response<Type> = {
  data: Type
  status: number
  success: true
} | {
  status: number
  success: false
}

export const postPet = async (name: string, isVaccinated: boolean): Promise<Response<Pet>> => {
  const response = await _postPet(name, isVaccinated)
  if (!response)
    return { success: false, status: 0  }
  if (response.status !== 200)
    return { success: false, status: response.status  }
  const data = validatePet(response)
  if (!data)
    return { success: false, status: response.status  }
  return { success: true, status: response.status, data }
}