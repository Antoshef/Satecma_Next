const TableHeader: React.FC = () => {
  return (
    <tr className="bg-gray-700 text-white">
      <td>№</td>
      <td>Продукт / Услуга</td>
      <td>Количество</td>
      <td>Опаковка</td>
      <td>Ед. цена</td>
      <td>Отстъпка</td>
      <td>ДДС</td>
      <td>Стойност (без ДДС)</td>
    </tr>
  );
};

export default TableHeader;
