import { formatMoney } from "../utils/format-money";
import { useEntries } from "../hooks/useEntries";

export default function IncomeList() {
    const { entries, setEntries } = useEntries();
    const incomeEntries = entries.filter((entry) => entry.type === "income");

    return (
        <div>
            <div className="flex">
                <h2 className="border-b pb-2 font-medium text-green-600">
                    Income
                </h2>
                <h2 className="grow border-b pb-2 font-medium text-green-600 text-center">
                    Category
                </h2>
            </div>
            {incomeEntries.length === 0 && (
                <p className="py-2.5 text-gray-600">There are no expenses.</p>
            )}

            <ul id="income-list" className="divide-y">
                {incomeEntries.map((income) => {
                    return (
                        <li key={income.id} className="py-2.5">
                            <div className="group flex justify-between gap-2 text-sm">
                                <span>{income.title}</span>
                                <span>{income?.category}</span>
                                <div>
                                    <span className="text-green-600">
                                        {formatMoney(income.value)}
                                    </span>
                                    <span
                                        onClick={() => {
                                            setEntries((prev) => {
                                                const filtered = [
                                                    ...prev,
                                                ].filter(
                                                    (value) =>
                                                        value.id !== income.id
                                                );
                                                return filtered;
                                            });
                                        }}
                                        className="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
                                    >
                                        Delete
                                    </span>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
