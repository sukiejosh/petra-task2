<template>
  <div>
    <div>
      <div
        v-for="q,i in st.products"
        class="flex lg:mt-10 px-2 py-10 rounded-box border-t border-b border-primary mt-2 lg:flex-row lg:p-20 flex-col space-y-1 lg:space-x-4 lg:space-y-0 shadow-lg"
      >
        <div class="lg:flex-none">
          <img
            :data-src="q.img"
            :src="q.img"
            class="h-96 w-full"
            alt="product_image_name-Oraimo-OPB-P116DN 10000 Mah Power-Bank Dual Fast Charging-1"
          />
        </div>
        <div class="lg:flex-1">
          <div class="flex flex-col space-y-2 w-full">
            <div class="font-bold lg:text-3xl text-xl">{{ q.name }}</div>
            <div>Brand : {{ q.brand }}</div>
            <div class="flex space-x-1">
              <mdi-star v-for="n in 5" :key="n" />
            </div>
            <div class="divider"></div>
            <div class="flex flex-col space-y-3">
              <div class="text-3xl font-bold">{{ q.price }}</div>
              <div class="flex space-x-3 items-center py-5">
                <div class="flex-none">
                  <button
                    :disabled="items == 0"
                    class="btn btn-sm btn-primary"
                    @click="removeItems"
                  >
                    <mdi-minus />
                  </button>
                </div>
                <div
                  class="flex-none font-bold"
                >{{ items }} {{ items > 1 ? 'quantities' : 'quantity' }}</div>
                <div class="flex-none">
                  <button class="btn btn-sm btn-primary" @click="items++">
                    <mdi-plus />
                  </button>
                </div>
              </div>
              <div>
                <button
                  @click="addCart(q.id, items)"
                  class="btn btn-wide btn-primary btn-outline flex space-x-4"
                >
                  <div>Add to cart</div>
                  <mdi-cart-plus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from "~/stores/user"

export default {
  setup() {
    useHead({
      title: 'Home',
      meta: [
        { name: 'description', content: 'Home' },
      ],
    })
    const st = useUserStore()
    return { st }
  },
  data() {
    return {
      items: 3
    }
  },
  methods: {
    removeItems() {
      if (this.items <= 0) {
        return
      }
      this.items--
    },
    addCart(id: string, quantity: number) {
      this.st.addToCart({ id, quantity })
      this.$router.push({ name: 'cart' })
    }
  },
}
</script>

