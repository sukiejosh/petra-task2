<template>
  <div class="p-3 lg:p-24 w-full">
    <div
      v-for="c,i in cart"
      :key="i"
      class="flex w-full p-5 lg:p-20 rounded-box border-t border-b border-primary shadow-lg lg:mt-10 mt-3 flex-col lg:space-x-10 lg:flex-row lg:space-y-0 space-y-10"
    >
      <div class="flex-1">
        <div class="flex">
          <div>
            <img
              :data-src="c.img"
              :src="c.img"
              class="h-20 w-20"
              alt="product_image_name-Oraimo-OPB-P116DN 10000 Mah Power-Bank Dual Fast Charging-1"
            />
          </div>
          <div class="font-bold text-xl">{{ c.name }}</div>
        </div>
      </div>
      <div class="flex-none">
        <div class="flex space-x-3 justify-between">
          <div class="flex flex-col space-y-2">
            <div class="font-bold text-xs lg:text-sm">Quantity</div>
            <div class="text-center">{{ c.quantity }}</div>
          </div>
          <div class="divider divider-vertical"></div>
          <div class="flex flex-col space-y-2">
            <div class="font-bold text-xs lg:text-sm">Unit Price</div>
            <div class="text-center">{{ c.price }}</div>
          </div>
          <div class="divider divider-vertical"></div>
          <div class="flex flex-col space-y-2">
            <div class="font-bold text-xs lg:text-sm">Subtotal</div>
            <div class="text-center">₦ {{ subTotal(c.price, c.quantity).formatted }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center lg:justify-end mt-5 pt-10">
      <a href="#checkout" class="btn btn-primary btn-outline">Proceed to checkout</a>
    </div>
    <div id="checkout" class="modal">
      <div class="modal-box rounded-t-box shadow-lg">
        <div>
          <div v-if="isLoading" class="flex items-center justify-center text-center">
            <div class="loader"></div>
          </div>

          <div v-if="confirmPayment == false" class="flex flex-col space-y-5">
            <div
              class="font-bold text-xl"
            >You will receive a one-time link in your email to signup and to pay for your product..Please enter a correct email address</div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                v-model="customerEmail"
                type="text"
                placeholder="johndoe@gmail.com"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Payment type: {{ paymentCurrency }}</span>
              </label>

              <div class="dropdown">
                <input
                  readonly
                  :value="paymentCurrency"
                  type="text"
                  placeholder="johndoe@gmail.com"
                  class="input input-bordered w-full"
                />
                <ul
                  tabindex="0"
                  class="p-2 shadow menu dropdown-content overflow-auto max-h-40 bg-base-100 rounded-box w-52"
                >
                  <li @click="paymentCurrency = p" v-for="(p,j) in allPaymentType" :key="j">
                    <a>{{ p }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else class="flex text-center justify-center font-bold text-xl">{{ paymentResult }}</div>
        </div>
        <div class="modal-action">
          <button
            :disabled="!customerEmail || !paymentCurrency"
            @click="setConfirmPayment"
            class="btn btn-primary flex-1"
          >{{ showResendButton == true ? 'Resend link' : 'Confirm payment' }}</button>
          <button @click="closemodal" class="btn">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from "~/stores/user";
// import PetraVue from "petra-vue" - doesnt work/errors in vue 3
import { $fetch } from 'ohmyfetch'



function numberWithCommas(x: string) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
const paymentResult = ref('')
const showResendButton = ref(false)
const isLoading = ref(false)
const setConfirmPayment = async () => {
  if (!customerEmail.value || !paymentCurrency.value) return
  isLoading.value = true
  await $fetch('https://petra-dev-api.herokuapp.com/transaction/initialize', {
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer sk_test_H7w7MvJyI7gHFBeCEvpktRcj7LRnyV84'
    },
    method: 'POST',
    body: {
      type: paymentCurrency.value,
      email: customerEmail.value,
      amount: amountToPay.value
    }
  })
    .then((r) => {
      console.log('Success', r)
      paymentResult.value = 'Check your email for a link'
      isLoading.value = false
      confirmPayment.value = true
      showResendButton.value = true
    })
    .catch((err) => {
      paymentResult.value = 'Error processing payment'
      isLoading.value = false
      confirmPayment.value = true
      showResendButton.value = true
      console.log('error', err.data)
    })

}

const router = useRouter()


const s = useUserStore()
const cart = s.cart
if (!cart || cart.length == 0) router.push('/')
const amountToPay = ref(null)
const customerEmail = ref('')
const confirmPayment = ref(false)

const paymentCurrency = ref('BTC')
const allPaymentType = ref([
  'BTC', 'ETH', 'LSC', 'BSC', 'TRON'
])
// const onClose = () => {
//   console.log('Modal payment closed')
// }
// const onSuccess = () => {
//   console.log('Success')
// }
const subTotal = (price: string, quantity: number) => {
  let am = Number(String(price).slice(1).replace(',', '')) * Number(quantity)
  //@ts-ignore
  amountToPay.value = am
  return {
    value: am,
    formatted: numberWithCommas(String(am))
  }
}
const closemodal = () => window.location.hash = ''
// const petraData = {
//   amount: amountToPay.value,
//   title: 'Josh-Petra store',
//   email: customerEmail.value,
//   key: 'pk_test_FYXkKSpKynZR48TRfDZ5nGu7rJb6GCuQ'
// }
</script>
<style>
.loader {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>