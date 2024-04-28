'use client';

import * as Ariakit from '@ariakit/react';
import { matchSorter } from 'match-sorter';
import { startTransition, useMemo, useState } from 'react';
import { Tool } from '../lib/api';

interface SelectToolProps {
  tools: Array<Tool>;
}

export function SelectTool({ tools }: SelectToolProps) {
  const [searchValue, setSearchValue] = useState('');

  const matches = useMemo(() => {
    return matchSorter(tools, searchValue, {
      keys: ['name'],
      baseSort: (a, b) => (a.index < b.index ? -1 : 1),
    });
  }, [searchValue, tools]);

  return (
    <div className="wrapper">
      <Ariakit.ComboboxProvider
        resetValueOnHide
        setValue={(value) => {
          startTransition(() => {
            setSearchValue(value);
          });
        }}
      >
        <Ariakit.SelectProvider>
          <Ariakit.Select className="button" />
          <Ariakit.SelectPopover gutter={4} sameWidth className="popover">
            <div className="combobox-wrapper">
              <Ariakit.Combobox
                autoSelect
                placeholder="Search..."
                className="combobox"
              />
            </div>
            <Ariakit.ComboboxList>
              {matches.map(({ id, name }) => (
                <Ariakit.SelectItem
                  key={id}
                  value={name}
                  className="select-item"
                  render={<Ariakit.ComboboxItem />}
                />
              ))}
            </Ariakit.ComboboxList>
          </Ariakit.SelectPopover>
        </Ariakit.SelectProvider>
      </Ariakit.ComboboxProvider>
    </div>
  );
}
