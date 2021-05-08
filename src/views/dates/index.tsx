import React, { MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useAtomValue } from 'jotai/utils';
import _groupBy from 'lodash/groupBy';
import _sortBy from 'lodash/sortBy';

import { shipmentDataListAtom } from 'atoms/shipments.atoms';
import { ShipmentType } from 'data/shipmentdata';
import Card from 'components/Card/Card';

export default function ShipmentsDates(): JSX.Element {
  const history = useHistory();
  const shipmentData = useAtomValue(shipmentDataListAtom);

  const arrivalGroup: Record<string, Array<ShipmentType>> = _groupBy(
    _sortBy(shipmentData, ['estimated_arrival']),
    'estimated_arrival'
  );

  const departureGroup: Record<string, Array<ShipmentType>> = _groupBy(
    _sortBy(shipmentData, ['estimated_departure']),
    'estimated_departure'
  );

  const handleDatesCardClick = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    history.push('/shipments');
  };

  return (
    <div className="px-20">
      <h2 className="text-2xl">Shipment by Dates</h2>
      <div className="flex justify-evenly py-4">
        <Card
          onClick={handleDatesCardClick}
          cardGroup={departureGroup}
          title="Shipments by Departure"
          itemsCount={Object.keys(departureGroup).length}
        />
        <Card
          onClick={handleDatesCardClick}
          cardGroup={arrivalGroup}
          title="Shipments by Arrival"
          itemsCount={Object.keys(arrivalGroup).length}
        />
      </div>
    </div>
  );
}
