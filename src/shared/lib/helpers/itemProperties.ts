import type { Item } from '~/shared/types/item';
import { Property } from '~/shared/config/enums';


export function getItemProperties(item: Item): Property[] {
  const properties: Property[] = [];

  if (item.flyable) {
    properties.push(Property.FLYABLE);
  }

  if (item.rideable) {
    properties.push(Property.RIDEABLE);
  }

  return properties;
}

