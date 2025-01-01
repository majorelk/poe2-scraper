import axios, { AxiosResponse } from 'axios';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  StaticItems,
  ItemCategory,
  ItemIcon,
  BulkItem,
  StatCategory,
} from './interfaces';
import * as Tables from '../client/tables';

interface PostData {
  query: {
    status: {
      option: string;
    };
    stats: Array<{
      type: string;
      filters: Array<any>;
    }>;
    filters: {
      type_filters: {
        filters: {
          category: {
            option: string;
          };
        };
      };
    };
  };
  sort: {
    price: string;
  };
}

interface ResponseData {
  // Define the structure of the response data here
  [key: string]: any;
}

async function sendRequest(itemType: string, league: string): Promise<ResponseData> {
  const url = `https://www.pathofexile.com/api/trade2/search/poe2/${league}`;

  const postData: PostData = {
    query: {
      status: {
        option: 'online'
      },
      stats: [
        {
          type: 'and',
          filters: []
        }
      ],
      filters: {
        type_filters: {
          filters: {
            category: {
              option: itemType
            }
          }
        }
      }
    },
    sort: {
      price: 'asc'
    }
  };

  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const response: AxiosResponse<ResponseData> = await axios.post(url, postData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error during request:', error);
    return { error: 'Request failed' };
  }
}

export function API_ALL_ITEMS(): ItemCategory[] {
  const itemsFilePath = path.join(__dirname, '../json-api/items.json');
  const data = fs.readFileSync(itemsFilePath, { encoding: 'utf-8' });
  const items: ItemCategory[] = JSON.parse(data)['result'];

  return items;
}

export function API_BULK_ITEMS(): BulkItem[] {
  return [];
}

function GetIconUrl(baseType: string, uniqueName: string | undefined): string {
  if (uniqueName) {
    // Get from words where Text2 === uniqueName
    const words = Tables.Words();
    const word = words.find((w) => w.Text2 === uniqueName);

    // Get from UniquesStashLayout where WordsKey === word.Id
    const uniques = Tables.UniquesStashLayout();
    const unique = uniques.find((u) => u.WordsKey === word?._index);

    // Get from ItemVisualIdentity where Id === unique.ItemVisualIdentityKey
    const itemVisualIdentity = Tables.ItemVisualIdentity();
    const itemVisualIdentityEntry = itemVisualIdentity.find(
      (i) => i._index === unique?.ItemVisualIdentityKey,
    );
  }

  return '';
}

export function API_ITEM_ICONS(): ItemIcon[] {
  const itemsFilePath = path.join(__dirname, '../json-api/static.json');
  const itemsData = fs.readFileSync(itemsFilePath, { encoding: 'utf-8' });
  const items: ItemCategory[] = JSON.parse(itemsData)['result'];

  const staticFilePath = path.join(__dirname, '../json-api/items.json');
  const staticData = fs.readFileSync(staticFilePath, { encoding: 'utf-8' });
  const staticItems: StaticItems[] = JSON.parse(staticData)['result'];

  // Convert StaticItems to ItemIcon
  const itemIcons: ItemIcon[] = items.flatMap((s) =>
    s.entries.map((e) => {
      // Compute the image

      return {
        baseType: e.type,
        icon: GetIconUrl(e.type, e.name),
        unique: e.name,
      };
    }),
  );

  return itemIcons;
}

export function API_STATS(): StatCategory[] {
  const itemsFilePath = path.join(__dirname, '../json-api/stats.json');
  const data = fs.readFileSync(itemsFilePath, { encoding: 'utf-8' });
  const items: StatCategory[] = JSON.parse(data)['result'];

  return items;
}

export { sendRequest };