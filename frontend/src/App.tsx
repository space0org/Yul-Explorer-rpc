import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Network, Blocks, Search } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

interface NetworkInfo {
  connections: number;
  blocks: number;
  difficulty: number;
  chain: string;
}

interface Block {
  height: number;
  hash: string;
  difficulty: number;
  size: number;
  time: number;
  transactions: number;
}

interface Transaction {
  txid: string;
  time: number;
  size: number;
  fee: number;
  confirmations: number;
}

function App() {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [latestBlock, setLatestBlock] = useState<Block | null>(null);
  const [mempoolTxs, setMempoolTxs] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [networkRes, blockRes, mempoolRes] = await Promise.all([
          fetch(`${API_URL}/api/network/info`),
          fetch(`${API_URL}/api/blocks/latest`),
          fetch(`${API_URL}/api/transactions/mempool`)
        ]);

        const networkData = await networkRes.json();
        const blockData = await blockRes.json();
        const mempoolData = await mempoolRes.json();

        setNetworkInfo(networkData);
        setLatestBlock(blockData);
        setMempoolTxs(mempoolData.transactions);
        setError(null);
      } catch (err) {
        setError("ネットワークエラーが発生しました");
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-red-500">エラー</CardTitle>
          </CardHeader>
          <CardContent>{error}</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">BSV ブロックエクスプローラー</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              ネットワーク情報
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>接続数: {networkInfo?.connections}</p>
              <p>ブロック高: {networkInfo?.blocks}</p>
              <p>難易度: {networkInfo?.difficulty}</p>
              <p>チェーン: {networkInfo?.chain}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Blocks className="h-5 w-5" />
              最新ブロック
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>高さ: {latestBlock?.height}</p>
              <p>ハッシュ: {latestBlock?.hash?.substring(0, 20)}...</p>
              <p>サイズ: {latestBlock?.size} bytes</p>
              <p>トランザクション数: {latestBlock?.transactions}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              メモリプール
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>TXID</TableHead>
                  <TableHead>サイズ</TableHead>
                  <TableHead>手数料</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mempoolTxs.slice(0, 5).map((tx) => (
                  <TableRow key={tx.txid}>
                    <TableCell className="font-mono">{tx.txid.substring(0, 8)}...</TableCell>
                    <TableCell>{tx.size} bytes</TableCell>
                    <TableCell>{tx.fee.toFixed(8)} BSV</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
