import './Shipments.module.css';
import React, { useRef } from 'react';
import { useAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';

import { shipmentDataListAtom } from 'atoms/shipments.atoms';
import { ShipmentType } from 'data/shipmentdata';
import ShipmentForm, {
  ShipmentFormElement,
} from 'components/ShipmentForm/ShipmentForm';
import Modal, { IModal } from 'components/Modal/Modal';

export default function Shipments(): JSX.Element {
  const modal = useRef<IModal>(null);
  const [shipmentData, setShipmentData] = useAtom(shipmentDataListAtom);

  const handleAddNewShipment = () => {
    modal.current?.open();
  };

  const onSubmit = (event: React.SyntheticEvent<ShipmentFormElement>): void => {
    const newShipment: ShipmentType = {
      shipment_id: uuidv4(),
      client_name: event.currentTarget.elements.shipmentClientInput.value,
      destination: event.currentTarget.elements.shipmentDestinationInput.value,
      origin: event.currentTarget.elements.shipmentOriginInput.value,
      mode: event.currentTarget.elements.shipmentModeSelect.value,
      estimated_arrival:
        event.currentTarget.elements.shipmentArrivalInput.value,
      estimated_departure:
        event.currentTarget.elements.shipmentDepartureInput.value,
      status: event.currentTarget.elements.shipmentStatusSelect.value,
    };
    setShipmentData([newShipment, ...shipmentData]);
    modal.current?.close();
  };

  const onCancel = (): void => {
    modal.current?.close();
  };

  return (
    <div className="px-20">
      <h2 className="text-2xl">Shipments view</h2>
      <button
        onClick={handleAddNewShipment}
        className="rounded-sm bg-green-500 text-white px-2 py-3 my-2 hover:bg-green-900"
      >
        Add New Shipment
      </button>

      <Modal ref={modal}>
        <>
          <h2 className="text-xl">Add new shipment</h2>
          <ShipmentForm handleSubmit={onSubmit} handleCancel={onCancel} />
        </>
      </Modal>
      <table>
        <thead>
          <tr>
            <td>Client</td>
            <td>Origin</td>
            <td>Destination</td>
            <td>Mode</td>
            <td>Estimated Departure</td>
            <td>Estimated Arrival</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {shipmentData.map((shipItem: ShipmentType) => (
            <tr key={shipItem.shipment_id}>
              <td>{shipItem.client_name}</td>
              <td>{shipItem.origin}</td>
              <td>{shipItem.destination}</td>
              <td>{shipItem.mode}</td>
              <td>{shipItem.estimated_departure}</td>
              <td>{shipItem.estimated_arrival}</td>
              <td>{shipItem.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
