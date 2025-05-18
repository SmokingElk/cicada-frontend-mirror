export default {
  authService: {
    input: { target: "swagger/auth.json" },
    output: {
      target: "./external/auth/auth.ts",
      mode: "split",
      client: "axios",
      baseUrl: "https://cicada-chess.ru:8081",
    },
  },

  userService: {
    input: { target: "swagger/users.json" },
    output: {
      target: "./external/users/users.ts",
      mode: "split",
      client: "axios",
      baseUrl: "https://cicada-chess.ru:8080",
    },
  },
};
