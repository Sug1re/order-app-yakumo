export const getAuthErrorMessage = (code: string) => {
  switch (code) {
    case "auth/invalid-email":
      return "メールアドレスの形式が正しくありません";

    case "auth/user-not-found":
      return "ユーザーが存在しません";

    case "auth/wrong-password":
      return "パスワードが間違っています";

    case "auth/too-many-requests":
      return "試行回数が多すぎます。しばらくしてからお試しください";

    case "auth/network-request-failed":
      return "ネットワークエラーが発生しました";

    default:
      return undefined;
  }
};