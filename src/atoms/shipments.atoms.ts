import { atom } from 'jotai';

import { ShipmentType, shipmentData } from '../data/shipmentdata';


export const shipmentDataListAtom = atom<Array<ShipmentType>>(shipmentData);
