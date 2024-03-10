interface TileType {
  id: string;
  label: string;
}

interface TileComponentProps {
  data: TileType[];
  selected: string | TileType[]; // Modificado para aceitar string ou TileType[]
  onClick: (item: TileType) => void;
}

export default function TileComponent({ data, selected = [], onClick }: TileComponentProps) {
  return data && data.length ? (
    <div className="mt-3 flex flex-wrap items-center gap-4">
      {data.map((dataItem) => (
        <label
          onClick={() => onClick(dataItem)}
          className={`cursor-pointer ${
            (Array.isArray(selected) &&
              selected.length &&
              selected.map((item) => item.id).indexOf(dataItem.id) !== -1) ||
            (typeof selected === 'string' && selected === dataItem.label) // Verifica se a string selecionada é igual ao label do item
              ? "bg-black"
              : ""
          }`}
          key={dataItem.id}
        >
          <span
            className={`rounded-lg border border-black px-6 py-2 my-4 text-sm font-bold ${
              (Array.isArray(selected) &&
                selected.length &&
                selected.map((item) => item.id).indexOf(dataItem.id) !== -1) ||
              (typeof selected === 'string' && selected === dataItem.label)
                ? "text-white"
                : ""
            }`}
          >
            {dataItem.label}
          </span>
        </label>
      ))}
    </div>
  ) : null;
}
