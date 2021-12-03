<template>
  <div>
    <button
      v-html="`${data.title}`"
      :style="{ ...data.button, ...(disabled ? disabledBtn : {}) }"
      :disabled="disabled"
      @mouseover="mover()"
      @mouseleave="moout()"
      @click="openIframe()"
    ></button>
    <br />
    <br />

    <div :style="dModal">
      <div :style="dModalContent">
        <div ref="loaderWrapper" id="loaderWrapper" :style="loaderWrapper">
          <img
            ref="loaderImg"
            alt="loader"
            :style="loaderImg"
            id="loaderImg"
            src="https://res.cloudinary.com/petra-africa/image/upload/v1609488355/petra-logo/spaces_-MBhp6jTeo09Trf_Xy9A_avatar-1594409940483_dyxrq3.png"
          />
        </div>
        <!-- <button :style="dModalClose" @click="closeModal()">
          <svg height="32px" viewBox="0 0 329.26933 329" width="32px" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>
        </button>-->
        <button :style="dModalClose" @click="closeModal()">
          <svg
            height="32px"
            id="Layer_1"
            style="enable-background:new 0 0 512 512;"
            version="1.1"
            viewBox="0 0 512 512"
            width="32px"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"
            />
          </svg>
        </button>
        <iframe
          ref="dFrame"
          :src="`https://checkout.petra.africa/?amount=${data.amount}&email=${data.email}&key=${data.key}&payType=${data.payType ? data.payType + '&id=' + data.id : ''}`"
          frameborder="0"
          :style="dIframe"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
.petra-vue {
  display: block;
  width: 400px;
  margin: 25px auto;
  border: 1px solid #ccc;
  background: #eaeaea;
  text-align: center;
  padding: 25px;
}
.petra-vue p {
  margin: 0 0 1em;
}
</style>

<script lang="ts">

export default /*#__PURE__*/{
  name: 'PetraVue', // vue component name
  props: ['data', 'onSuccess', 'onClose', 'disabled'],
  data() {
    return {
      myModal: { display: "none" },
      dbutton2: {
        backgroundColor: "#F7A200",
        border: "none",
        borderRadius: "10px",
        color: "white",
        textAlign: "center",
        textDecoration: "none",
        height: "50px",
        width: "250px",
        display: "inline-flex",
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: "14px",
        transitionDuration: "0.4s",
        cursor: "pointer",
        padding: "10px 32px",
        opacity: "1"
      },
      dModalContent: {
        backgroundColor: "#fefefe",
        margin: "auto",
        // padding: "20px",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        maxWidth: "1020px",
        borderRadius: "0.5rem"
      },
      dIframe: {
        display: "none",
        border: "none",
        height: "100%",
        width: "100%",
        zIndex: "99999",
      },
      dModalClose: {
        color: "#aaaaaa",
        position: "absolute",
        top: "3.5%",
        right: "3.5%",
        float: "right",
        fontSize: "28px",
        fontWeight: "bold",
        cursor: "pointer",
        zIndex: "999999",
        border: "none",
        outline: "none",
        background: "none",
      },
      dModal: {
        display: "none",
        position: "fixed",
        zIndex: "1",
        // paddingTop: "20px",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        overflow: "auto",
        // backgroundColor: "rgb(0,0,0)",
        backgroundColor: "rgba(0,0,0,0.4)",
      },
      loaderWrapper: {
        height: "100vh",
        display: "grid",
        placeItems: "center",
      },
      loaderImg: {
        height: "100px",
        width: "100px",
        display: "block",
        animation: "loader 1s 1s infinite",
      },
      disabledBtn: {
        opacity: 0.4,
        cursor: 'not-allowed'
      }
    }
  },
  methods: {
    mover() {
      this.dbutton2.opacity = "0.8"
    },

    moout() {
      this.dbutton2.opacity = "1"
    },

    openIframe() {
      this.handleAnimation();
      this.dModal.display = 'flex'
      // this.$refs.dFrame.addEventListener('load', this.handleIframeLoaded, true)
      this.iframeData(this)
    },

    handleIframeLoaded() {
      //   this.$refs.dFrame.removeEventListener('load', this.handleIframeLoaded, true)
      this.$refs.loaderImg.style.display = "none";
      this.$refs.dFrame.style.display = "block";
      console.log('HANDLE LOAD')
    },

    closeModal(data) {
      if (data) data()
      // eslint-disable-next-line no-self-assign
      this.$refs.dFrame.src = this.$refs.dFrame.src
      this.dModal.display = 'none'
    },

    handleAnimation() {
      this.$refs.dFrame.style.display = 'none'
      const loader = this.$refs.loaderImg;
      if (!loader) {
        loader.setAttribute('src', 'https://res.cloudinary.com/petra-africa/image/upload/v1609488355/petra-logo/spaces_-MBhp6jTeo09Trf_Xy9A_avatar-1594409940483_dyxrq3.png')
      }
      loader.style.display = 'block'
      loader.animate([
        // keyframes
        { transform: 'scale(0.7)' },
        { transform: 'scale(0.8)' },
        { transform: 'scale(0.7)' }
      ], {
        // timing options
        duration: 1000,
        iterations: Infinity
      });
      setTimeout(() => {
        this.$refs.loaderImg.style.display = "none";
        this.$refs.dFrame.style.display = "block";
      }, 7000);
    },

    iframeData(dataFunc) {
      window.addEventListener('message', function (event) {
        if (event.origin == 'https://www.thepetra.co/') {
          if (event.data == 'false pass') {
            dataFunc.closeModal(dataFunc.onClose)

          }
          if (event.data == 'false pass1') {
            dataFunc.closeModal(dataFunc.onSuccess)
          }
        }
      })
    },
  },
};
</script>
