const app = Vue.createApp({
  data() {
    return {
      itemname: "",
      itememail: "",
      itemtel: "",
      itempassword: "",
      itemrepassword: "",
      itembrith: "",
      carSelected: "",
      fileInp: null,
      checkbox: false,
      submitted: false,
      showPassword: false,
      captchaCode: "",
      captchaInput: "",
      captchaError: false,
      imageUrl: "", // Added to handle image preview
    };
  },
  computed: {
    passwordType() {
      return this.showPassword ? "text" : "password";
    },
    hasUppercase() {
      return /[A-Z]/.test(this.itempassword);
    },
    hasLowercase() {
      return /[a-z]/.test(this.itempassword);
    },
    hasNumber() {
      return /\d/.test(this.itempassword);
    },
    hasMinLength() {
      return this.itempassword.length >= 8;
    },
    passwordStrength() {
      let strength = 0;
      if (this.hasUppercase) strength += 25;
      if (this.hasLowercase) strength += 25;
      if (this.hasNumber) strength += 25;
      if (this.hasMinLength) strength += 25;
      return strength;
    },
    strengthColor() {
      if (this.passwordStrength < 50) return '#ff4d4d'; // Red
      if (this.passwordStrength < 75) return '#ffcc00'; // Yellow
      return '#28a745'; // Green
    },
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    checkPasswordMatch() {
      this.passwordMismatch = this.itempassword !== this.itemrepassword;
    },
    registerAnswer() {
      if (this.passwordMismatch) {
        return;
      }
      if (!this.checkbox) {
        alert("You must accept the terms of service.");
        return;
      }
      if (this.captchaInput !== this.captchaCode) {
        this.captchaError = true;
        return;
      }
      this.captchaError = false;
      this.submitted = true;
    },
    updateVal(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
      this.fileInp = file ? file.name : null;
    },
    generateCaptcha() {
      this.captchaCode = Math.random().toString(36).substring(2, 7).toUpperCase();
      this.captchaError = false;
    },
  },
  mounted() {
    this.generateCaptcha();
  },
});

app.mount("#app");
