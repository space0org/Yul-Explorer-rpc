# Yul Explorer RPC

BSVブロックチェーンのブロックエクスプローラー

## 機能

- ネットワーク情報の表示
- 最新ブロックの詳細表示
- メモリプールのモニタリング
- トランザクション検索
- アドレス履歴と残高確認

## 環境構築

本プロジェクトはDockerを使用して、クロスプラットフォーム（Windows、macOS、Linux）で一貫した環境を提供します。

### 必要条件

- Docker Desktop (Windows/macOS) または Docker Engine (Linux)
- Docker Compose

### クイックスタート

1. リポジトリのクローン:
```bash
git clone https://github.com/space0org/Yul-Explorer-rpc.git
cd Yul-Explorer-rpc
```

2. Docker Composeでの起動:
```bash
docker compose up -d
```

これで以下のサービスが起動します:
- フロントエンド: http://localhost:5173
- バックエンドAPI: http://localhost:8000
- Swagger UI (API ドキュメント): http://localhost:8000/docs

### 手動セットアップ (開発用)

必要条件:
- Python 3.12以上
- Node.js 18以上
- pnpm (Node.jsパッケージマネージャー)
- BSVノードへのアクセス

#### バックエンド設定

1. Pythonの依存関係をインストール:
```bash
cd app
pip install -r requirements.txt
```

2. 環境変数の設定:
```bash
# Linux/macOS
export RPC_USER=bitcoin
export RPC_PASSWORD=bitcoin
export RPC_HOST=localhost
export RPC_PORT=18332

# Windows (PowerShell)
$env:RPC_USER="bitcoin"
$env:RPC_PASSWORD="bitcoin"
$env:RPC_HOST="localhost"
$env:RPC_PORT="18332"
```

3. バックエンドの起動:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

#### フロントエンド設定

1. フロントエンドの依存関係をインストール:
```bash
cd frontend
pnpm install
```

2. 環境変数の設定:
```bash
# Linux/macOS
echo "VITE_API_URL=http://localhost:8000" > .env

# Windows (PowerShell)
Set-Content -Path .env -Value "VITE_API_URL=http://localhost:8000"
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

### Docker を使用したデプロイ (推奨)

1. イメージのビルド:
```bash
docker compose build
```

2. サービスの起動:
```bash
docker compose up -d
```

3. ログの確認:
```bash
docker compose logs -f
```

### 手動デプロイ

#### バックエンド (Fly.io)

1. Fly.ioのCLIをインストール
2. アプリケーションを作成:
```bash
fly launch
```

3. デプロイ:
```bash
fly deploy
```

#### フロントエンド

1. ビルド:
```bash
cd frontend
pnpm build
```

2. 静的ファイルをホスティングサービスにデプロイ

## トラブルシューティング

### Docker関連

1. ポートの競合:
```bash
# 使用中のポートの確認
docker compose ps

# 特定のポートを使用しているプロセスの確認
lsof -i :8000  # バックエンドポート
lsof -i :5173  # フロントエンドポート
```

2. コンテナのログ確認:
```bash
docker compose logs backend
docker compose logs frontend
```

### 開発環境

1. パッケージのインストールエラー:
```bash
# Node.jsモジュールのキャッシュクリア
pnpm store prune

# Pythonの仮想環境の再作成
python -m venv .venv --clear
```

2. APIアクセスエラー:
- CORS設定の確認
- 環境変数の確認
- BSVノードの接続状態確認

## ライセンス

MIT License
