const TableHeader: React.FC = () => {
  return (
    <>
      <td className="text-center text-small">№</td>
      <td className="text-right text-small">Продукт / Услуга</td>
      <td className="text-right text-small">Количество</td>
      <td className="text-right text-small">Опаковка</td>
      <td className="text-right text-small">Ед. цена</td>
      <td className="text-right text-small">Отстъпка</td>
      <td className="text-right text-small">ДДС</td>
      <td className="text-right text-small">Стойност (без ДДС)</td>
    </>
  );
};

export default TableHeader;
