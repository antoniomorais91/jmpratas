//add a new product service

import Cookies from "js-cookie";

export const addNewProduct = async (formData) => {
  try {
    const response = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Falha ao adicionar o produto: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    // Lançar a exceção ou retornar um objeto de erro adequado para o serviço lidar
  }
};

export const getAllAdminProducts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/admin/all-products", {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAProduct = async (formData) => {
  try {
    const res = await fetch("/api/admin/update-product", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      cache: "no-store",
      body: JSON.stringify(formData),
    });

    // Verifica o status da resposta HTTP
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      // Se a resposta não for bem-sucedida, lança um erro com a mensagem adequada
      throw new Error(`Erro na atualização do produto: ${res.statusText}`);
    }
  } catch (error) {
    // Loga o erro no console ou tome medidas adicionais, se necessário
    console.error("Erro ao atualizar o produto:", error);
    // Pode lançar ou retornar uma mensagem de erro amigável, dependendo dos requisitos
    throw new Error("Erro ao atualizar o produto. Por favor, tente novamente mais tarde.");
  }
};

export const deleteAProduct = async (id) => {
  try {
    const res = await fetch(`/api/admin/delete-product?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const productByCategory = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/product-by-category?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const productById = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/product-by-id?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
