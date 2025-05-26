import { useState, useEffect, KeyboardEvent } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [items, setItems] = useState<IItem[]>(props.initialData);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const [currentSorting, setCurrentSorting] = useState<'ASC' | 'DESC'>(
        props.sorting,
    );
    useEffect(() => {
        setItems(props.initialData);
    }, [props.initialData]);
    useEffect(() => {
        setCurrentSorting(props.sorting);
    }, [props.sorting]);
    const sortedItems = [...items].sort((a, b) => {
        return currentSorting === 'ASC' ? a.id - b.id : b.id - a.id;
    });

    const startEditing = (item: IItem) => {
        setEditingId(item.id);
        setEditValue(item.name);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, item: IItem) => {
        if (e.key === 'Enter') {
            saveEdit(item);
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    };

    const saveEdit = (item: IItem) => {
        if (editValue.trim() === '') return;

        setItems(
            items.map((i) =>
                i.id === item.id ? { ...i, name: editValue } : i,
            ),
        );
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    return (
        <div>
            {sortedItems.map((item) => (
                <div key={item.id}>
                    {editingId === item.id ? (
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, item)}
                            onBlur={() => saveEdit(item)}
                            autoFocus
                        />
                    ) : (
                        <div onClick={() => startEditing(item)}>
                            {item.name}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
