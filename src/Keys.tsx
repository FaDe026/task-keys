import React, { useState, useEffect } from 'react';

interface IItem {
    id: number;
    name: string;
}

type Sorting = 'ASC' | 'DESC';

interface KeysProps {
    initialData: IItem[];
    sorting: Sorting;
}

const Keys: React.FC<KeysProps> = ({ initialData, sorting }) => {
    const [items, setItems] = useState<IItem[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedName, setEditedName] = useState<string>('');

    useEffect(() => {
        setItems(initialData);
    }, [initialData]);

    const sortedItems = [...items].sort((a, b) =>
        sorting === 'ASC' ? a.id - b.id : b.id - a.id,
    );

    const handleEditClick = (item: IItem) => {
        setEditingId(item.id);
        setEditedName(item.name);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.target.value);
    };

    const handleKeyDown = (id: number) => (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setItems((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, name: editedName } : item,
                ),
            );
            setEditingId(null);
        }

        if (e.key === 'Escape') {
            setEditingId(null);
        }
    };

    return (
        <div>
            {sortedItems.map((item) => (
                <div key={item.id}>
                    {editingId === item.id ? (
                        <input
                            key={`input-${item.id}`}
                            type="text"
                            value={editedName}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown(item.id)}
                            autoFocus
                        />
                    ) : (
                        <span onClick={() => handleEditClick(item)}>
                            {item.name}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Keys;
