# Yul Explorer RPC

BSVブロックチェーンのブロックエクスプローラー

## 機能

- ネットワーク情報の表示
- 最新ブロックの詳細表示
- メモリプールのモニタリング
- トランザクション検索
- アドレス履歴と残高確認

## 環境構築

### 必要条件

- Python 3.12以上
- Node.js 18以上
- pnpm (Node.jsパッケージマネージャー)
- BSVノードへのアクセス

### バックエンド設定

1. Pythonの依存関係をインストール:
```bash
cd app
pip install -r requirements.txt
```

2. 環境変数の設定:
```bash
export RPC_USER=bitcoin
export RPC_PASSWORD=bitcoin
export RPC_HOST=localhost
export RPC_PORT=18332
```

3. バックエンドの起動:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

### フロントエンド設定

1. フロントエンドの依存関係をインストール:
```bash
cd frontend
pnpm install
```

2. 環境変数の設定:
```bash
echo "VITE_API_URL=http://localhost:8000" > .env
```

3. 開発サーバーの起動:
```bash
pnpm dev
```

## API エンドポイント

- GET `/api/network/info` - ネットワーク情報
- GET `/api/blocks/latest` - 最新ブロック
- GET `/api/transactions/mempool` - メモリプールのトランザクション
- GET `/api/transactions/{txid}` - トランザクション詳細
- GET `/api/address/{address}` - アドレス情報と履歴

## デプロイ

### バックエンド (Fly.io)

1. Fly.ioのCLIをインストール
2. アプリケーションを作成:
```bash
fly launch
```

3. デプロイ:
```bash
fly deploy
```

### フロントエンド

1. ビルド:
```bash
cd frontend
pnpm build
```

2. 静的ファイルをホスティングサービスにデプロイ

## ライセンス

MIT License
