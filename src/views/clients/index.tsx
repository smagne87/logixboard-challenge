import React, { MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useAtomValue } from 'jotai/utils';
import _groupBy from 'lodash/groupBy';

import { shipmentDataListAtom } from 'atoms/shipments.atoms';
import { ShipmentType } from 'data/shipmentdata';
import Card from 'components/Card/Card';

export default function ShipmentsClients(): JSX.Element {
  const history = useHistory();
  const shipmentData = useAtomValue(shipmentDataListAtom);
  const clientGroup: Record<string, Array<ShipmentType>> = _groupBy(
    shipmentData,
    'client_name'
  );
  const handleClientCardClick = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    history.push('/shipments');
  };

  return (
    <div className="px-20">
      <h2 className="text-2xl">Shipments by client</h2>
      <div className="flex py-4">
        <Card
          cardGroup={clientGroup}
          onClick={handleClientCardClick}
          title="Shipments by Client"
          itemsCount={Object.keys(clientGroup).length}
        />
      </div>
      <div className="flex py-4 flex-wrap w-11/12">
        {Object.keys(clientGroup).map((client) => {
          const statusGroup: Record<string, Array<ShipmentType>> = _groupBy(
            clientGroup[client],
            'status'
          );
          const modeGroup: Record<string, Array<ShipmentType>> = _groupBy(
            clientGroup[client],
            'mode'
          );
          return (
            <>
              <Card
                key={client}
                cardGroup={statusGroup}
                onClick={handleClientCardClick}
                title={`Shipments for ${client} by Status`}
                itemsCount={Object.keys(statusGroup).length}
              />
              <Card
                key={client}
                cardGroup={modeGroup}
                onClick={handleClientCardClick}
                title={`Shipments for ${client} by Mode`}
                itemsCount={Object.keys(modeGroup).length}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}
