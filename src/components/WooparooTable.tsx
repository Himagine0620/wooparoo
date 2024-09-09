import { useState } from "react";

interface Content {
  id?: string; // idをオプションにする
  wooparoo_id: number;
  name: string;
  image: { url: string } | null;
  egg_image: { url: string } | null;
  type: string[];
  time: string[];
}

interface WooparooTableProps {
  contents: Content[];
}

const timeToSeconds = (time: any) => {
  if (Array.isArray(time)) {
    time = time[0]; // 配列の場合、最初の時間を使用
  }
  if (typeof time === 'string') {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }
  return 0;
};

export default function WooparooTable({ contents }: WooparooTableProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // ユニークなtimeオプションを取得
  const uniqueTimes = Array.from(new Set(contents.flatMap(content => content.time)));

  // 選択されたtimeに基づいてフィルタリング
  const filteredContents = selectedTime
    ? contents.filter(content => content.time.includes(selectedTime))
    : contents;

  return (
    <div>
      {/* time検索用セレクトフィールド */}
      <div className="mb-4">
        <label htmlFor="time-select" className="mr-2">召喚時間で検索:</label>
        <select
          id="time-select"
          onChange={(e) => setSelectedTime(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="">すべての時間</option>
          {uniqueTimes.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      {/* テーブル */}
      <table className="w-full">
        <thead>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <th className="border px-4 py-2 text-center font-bold">名前</th>
            <th className="border px-4 py-2 text-center font-bold">ウパルの画像</th>
            <th className="border px-4 py-2 text-center font-bold">召喚石の画像</th>
            <th className="border px-4 py-2 text-center font-bold">属性</th>
            <th className="border px-4 py-2 text-center font-bold">召喚時間</th>
          </tr>
        </thead>
        <tbody>
          {filteredContents
            .sort((a, b) => {
              const timeAInSeconds = timeToSeconds(a.time);
              const timeBInSeconds = timeToSeconds(b.time);
              return timeAInSeconds - timeBInSeconds;
            })
            .map((content) => (
              <tr key={content.wooparoo_id} className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-center">{content.name}</td>
                <td className="border px-4 py-2 text-center">
                  {content.image?.url ? (
                    <img src={`${content.image.url}?fit=crop&w=50&h=50`} alt={content.name} />
                  ) : (
                    <img src="" alt="" />
                  )}
                </td>
                <td className="border px-4 py-2 text-center">
                  {content.egg_image?.url ? (
                    <img src={`${content.egg_image.url}?fit=crop&w=50&h=50`} alt="Egg image" />
                  ) : (
                    <img src="" alt="" />
                  )}
                </td>
                <td className="border px-4 py-2 text-center">{content.type.join(', ')}</td>
                <td className="border px-4 py-2 text-center">{content.time.join(', ')}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
