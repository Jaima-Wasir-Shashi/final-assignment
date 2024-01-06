import { formatMoney } from "../utils/format-money";
import { useEntries } from "../hooks/useEntries";

export default function ExpenseList() {
    const { entries, setEntries } = useEntries();
    const expenseEntries = entries.filter((entry) => entry.type === "expense");

    return (
        <div>
            <div className="flex">
                <h2 className="border-b pb-2 font-medium text-red-600">
                    Expense
                </h2>
                <h2 className="grow border-b pb-2 font-medium text-red-600 text-center">
                    Category
                </h2>
            </div>

            {expenseEntries.length === 0 && (
                <p className="py-2.5 text-gray-600">There are no expenses.</p>
            )}

            <ul id="expense-list" className="divide-y">
                {expenseEntries.map((item) => {
                    return (
                        <li key={item.id} className="py-2.5">
                            <div className="group flex justify-between gap-2 text-sm">
                                <span>{item.title}</span>
                                <span>{item?.category}</span>
                                <div>
                                    <span className="text-red-600">
                                        -{formatMoney(item.value)}
                                    </span>
                                    <span
                                        onClick={() => {
                                            setEntries((prev) => {
                                                const filtered = [
                                                    ...prev,
                                                ].filter(
                                                    (value) =>
                                                        value.id !== item.id
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
