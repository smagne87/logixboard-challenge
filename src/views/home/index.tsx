import React, { MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useAtomValue } from 'jotai/utils';
import _groupBy from 'lodash/groupBy';

import { shipmentDataListAtom } from 'atoms/shipments.atoms';
import { ShipmentType } from 'data/shipmentdata';
import Card from 'components/Card/Card';

export default function Home(): JSX.Element {
  const history = useHistory();
  const shipmentData = useAtomValue(shipmentDataListAtom);
  const clientGroup: Record<string, Array<ShipmentType>> = _groupBy(
    shipmentData,
    'client_name'
  );
  const modeGroup: Record<string, Array<ShipmentType>> = _groupBy(
    shipmentData,
    'mode'
  );
  const statusGroup: Record<string, Array<ShipmentType>> = _groupBy(
    shipmentData,
    'status'
  );

  const arrivalGroup: Record<string, Array<ShipmentType>> = _groupBy(
    shipmentData,
    'estimated_arrival'
  );

  const departureGroup: Record<string, Array<ShipmentType>> = _groupBy(
    shipmentData,
    'estimated_departure'
  );
  const handleClientCardClick = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    history.push('/shipments-clients');
  };
  const handleCardClick = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    history.push('/shipments');
  };
  const handleDatesCardClick = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    history.push('/shipments-dates');
  };

  return (
    <div className="px-20">
      <h2 className="text-2xl">Welcome to Ligixboard</h2>
      <div className="flex py-4">
        <Card
          cardGroup={clientGroup}
          onClick={handleClientCardClick}
          title="Shipments by Client"
        />
        <Card
          onClick={handleCardClick}
          cardGroup={modeGroup}
          title="Shipments by Transportation mode"
        />
        <Card
          onClick={handleCardClick}
          cardGroup={statusGroup}
          title="Shipments by Status"
        />
        <Card
          onClick={handleDatesCardClick}
          cardGroup={arrivalGroup}
          title="Shipments by Arrival"
        />
        <Card
          onClick={handleDatesCardClick}
          cardGroup={departureGroup}
          title="Shipments by Departure"
        />
      </div>
    </div>
  );
}
