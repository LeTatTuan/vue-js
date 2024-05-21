const app = Vue.createApp({
    data() {
        return {
        }
    },
    methods: {
        onLogEvent() {
            console.log("Running event");
        }
    }
});

app.mount("#contact")