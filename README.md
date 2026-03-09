# TOEIC 700+ MASTER — iOS アプリ

`https://toeicplus.com` を Capacitor でラップしたネイティブiOSアプリです。

---

## 構成

```
toeic-ios/
├── capacitor.config.ts   # Capacitor設定（URLはtoeicplus.com）
├── ios/App/              # Xcodeプロジェクト
├── assets/               # アイコン・スプラッシュ原画像
└── .github/workflows/    # GitHub Actions自動ビルド
```

---

## ビルドに必要なもの

### 1. Apple Developer アカウント
- 年額 $99（約15,000円）: https://developer.apple.com
- 登録後、**Bundle ID** `com.amenomori.toeicplus` を作成

### 2. GitHub Secrets の設定
GitHubリポジトリ → Settings → Secrets → Actions に以下を追加：

| Secret名 | 内容 | 取得方法 |
|---|---|---|
| `APPLE_CERTIFICATE` | 配布証明書（.p12をBase64化） | Keychain Accessから書き出し |
| `APPLE_CERTIFICATE_PASSWORD` | 証明書のパスワード | 書き出し時に設定 |
| `KEYCHAIN_PASSWORD` | 任意の文字列（例: `build123`） | 自由に設定 |
| `APPLE_PROVISIONING_PROFILE` | プロビジョニングプロファイル（Base64化） | Apple Developerポータルから |
| `APPLE_TEAM_ID` | チームID（10文字） | Apple Developerポータル右上 |
| `APPLE_API_KEY_ID` | API Key ID（TestFlight用・任意） | App Store Connect → Keys |
| `APPLE_API_KEY_ISSUER` | Issuer ID（TestFlight用・任意） | App Store Connect → Keys |
| `APPLE_API_KEY_CONTENT` | API Key内容（TestFlight用・任意） | .p8ファイルをBase64化 |

### Base64変換コマンド（Mac）
```bash
# 証明書をBase64化
base64 -i certificate.p12 | pbcopy

# プロビジョニングプロファイルをBase64化
base64 -i profile.mobileprovision | pbcopy
```

---

## ビルド手順

### 自動ビルド（GitHub Actions）
1. このリポジトリをGitHubにプッシュ
2. Secretsを設定
3. `main`ブランチにプッシュ → 自動でビルド開始
4. Actions → 最新のワークフロー → Artifacts からIPAをダウンロード

### ローカルビルド（Mac必須）
```bash
npm install
npx cap sync ios
cd ios/App && pod install
open App.xcworkspace  # Xcodeで開いてビルド
```

---

## TestFlight配信手順

1. App Store Connect（https://appstoreconnect.apple.com）にログイン
2. 「マイApp」→「+」→新規App作成
3. Bundle ID: `com.amenomori.toeicplus`
4. GitHub ActionsでビルドされたIPAをアップロード
5. TestFlightにテスターを招待

---

## 証明書の作り方（Mac）

1. **Keychain Access** を開く
2. 「証明書アシスタント」→「認証局に証明書を要求」
3. Apple Developer ポータル → Certificates → + → iOS Distribution
4. CSRファイルをアップロード → .cer をダウンロード
5. Keychain Accessにインストール → .p12として書き出し

---

## よくある質問

**Q: App Storeに公開できますか？**  
A: Apple Developer アカウント（年額$99）があれば可能です。審査に1〜3日かかります。

**Q: TestFlightとは？**  
A: Appleが提供するベータテスト配信サービス。最大10,000人に無料で配信できます。

**Q: Androidアプリは？**  
A: Capacitorは Android にも対応しています。Google Play Storeへの公開も可能です。
