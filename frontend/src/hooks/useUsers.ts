import { useState, useEffect } from "react";

export type UserProps = {
  id?: number;
  fullname: string;
  email: string;
  role: string;
  document: string;
  login: string;
  password?: string;
  profileId?: number;
};

const API_URL = "http://localhost:7000/api/users";

export function useUsers() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }
      const data = await response.json();
      setLoading(false);
      setUsers(data);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (userData: UserProps) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar usuário.");
    }
  };

  const updateUser = async (id: number, userData: Partial<UserProps>) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar usuário.");
    }
  };

  const refreshUsers = () => {
    fetchUsers();
  };

  return { users, createUser, updateUser, refreshUsers, loading };
}
