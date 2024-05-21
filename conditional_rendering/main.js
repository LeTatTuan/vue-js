const app = Vue.createApp({
    data() {
        return {
            username: "letattuan",
            firstname: "Le",
            lastname: "Tat Tuan",
            isHello: true,
            isShowModal: false,
        }
    },
    methods: {
        onChangeName() {
            console.log(this);
            this.firstname = "Nguyen";
            this.lastname = "Bach Duong";
            this.isShowModal = !this.isShowModal;
        }
    }
});

app.mount("#contact")