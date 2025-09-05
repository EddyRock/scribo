import LeftMenuSearch from '@components/LeftMenu/components/LeftMenuSearch.tsx';
import LeftMenuItems from '@components/LeftMenu/components/LeftMenuItems.tsx';
import CreateNewFolderDialog from './LeftMenu/dialogs/CreateNewFolderDialog.tsx';

import { useState } from 'react';
import type { IItem } from '@components/LeftMenu/components/LeftMenuItem.tsx';

// import { authActions } from '@/store/actions/authActions.ts';

const INITIAL_ITEMS: IItem[] = [
  {
    id: '1',
    text: 'All Notes',
    badge: {
      count: 10
    }
  }
];

function LeftMenu() {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [selectedItem, setSelectedItem] = useState<IItem | null>(null);

  const onCreateNewFolder = (folderName = '') => {
    console.log('New folder name is', folderName);
    // setItems((prevState) => {
    //   const newItem: IItem = {
    //     id: -1,
    //     text: ''
    //   };
    //   return [...prevState, newItem];
    // });
  };

  return (
    <div className="w-full flex flex-col items-center justify-between max-w-[250px] h-[100vh] border border-gray-200 border-t-0">
      <div>
        <LeftMenuSearch onUpdateSearch={setSearch} search={search} />
        <LeftMenuItems items={items} onSetSelectedItem={setSelectedItem} />
      </div>

      <div className="p-4">
        <CreateNewFolderDialog onCreate={onCreateNewFolder} />
      </div>
    </div>
  );
}

export default LeftMenu;
