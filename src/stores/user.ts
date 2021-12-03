import { acceptHMRUpdate, defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  let cart: any = ref([]);
  let products = ref([
    {
      name: "Oraimo OPB-P116DN 10000 Mah Power-Bank Dual Fast Charging",
      img: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/34/642118/1.jpg?4585",
      price: "₦ 4,500",
      brand: "Oraimo",
      id: "100djdsfd",
    },
  ]);

  function addToCart({ id, quantity }: { id: string; quantity: number }) {
    let productIndex = products.value.findIndex((x) => x.id == id);
    if (productIndex == -1) {
      throw new Error("No product wit this id");
    }
    cart.value.push({
      ...products.value[productIndex],
      quantity,
    });
  }
  return {
    cart,
    products,
    addToCart,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
