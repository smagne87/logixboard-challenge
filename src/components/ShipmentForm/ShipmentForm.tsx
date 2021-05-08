import React, { useState } from 'react';
import clsx from 'clsx';
import './ShipmentForm.module.css';
import styles from './ShipmentForm.module.css';

interface IShipmentFormProps {
  handleSubmit: (event: React.SyntheticEvent<ShipmentFormElement>) => void;
  handleCancel: () => void;
}

interface FormElements extends HTMLFormControlsCollection {
  shipmentClientInput: HTMLInputElement;
  shipmentOriginInput: HTMLInputElement;
  shipmentDestinationInput: HTMLInputElement;
  shipmentModeSelect: HTMLSelectElement;
  shipmentDepartureInput: HTMLInputElement;
  shipmentArrivalInput: HTMLInputElement;
  shipmentStatusSelect: HTMLSelectElement;
}

export interface ShipmentFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type FormErrors = {
  shipmentClientInput?: boolean;
  shipmentOriginInput?: boolean;
  shipmentDestinationInput?: boolean;
  shipmentModeSelect?: boolean;
  shipmentDepartureInput?: boolean;
  shipmentArrivalInput?: boolean;
  shipmentStatusSelect?: boolean;
};

export default function ShipmentForm(props: IShipmentFormProps): JSX.Element {
  const [errors, setErrors] = useState<FormErrors>({});
  const { handleSubmit, handleCancel } = props;

  const isFormValid = (elements: FormElements): boolean => {
    let isValid = true;
    const _err: FormErrors = {};
    if (elements.shipmentClientInput.value === '') {
      isValid = false;
      _err.shipmentClientInput = true;
    }
    if (elements.shipmentOriginInput.value === '') {
      isValid = false;
      _err.shipmentOriginInput = true;
    }
    if (elements.shipmentDestinationInput.value === '') {
      isValid = false;
      _err.shipmentDestinationInput = true;
    }
    if (elements.shipmentModeSelect.value === '') {
      isValid = false;
      _err.shipmentModeSelect = true;
    }
    if (elements.shipmentDepartureInput.value === '') {
      isValid = false;
      _err.shipmentDepartureInput = true;
    }
    if (elements.shipmentArrivalInput.value === '') {
      isValid = false;
      _err.shipmentArrivalInput = true;
    }
    if (elements.shipmentStatusSelect.value === '') {
      isValid = false;
      _err.shipmentStatusSelect = true;
    }
    setErrors(_err);
    return isValid;
  };

  const onSubmit = (event: React.SyntheticEvent<ShipmentFormElement>): void => {
    event.preventDefault();
    if (isFormValid(event.currentTarget.elements)) {
      handleSubmit(event);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        id="shipmentClientInput"
        placeholder="Client"
        className={clsx({ [styles.error]: errors.shipmentClientInput })}
      />
      <input
        id="shipmentOriginInput"
        placeholder="Origin"
        className={clsx({ [styles.error]: errors.shipmentOriginInput })}
      />
      <input
        id="shipmentDestinationInput"
        placeholder="Destination"
        className={clsx({ [styles.error]: errors.shipmentDestinationInput })}
      />
      <select
        id="shipmentModeSelect"
        className={clsx({ [styles.error]: errors.shipmentModeSelect })}
      >
        <option value="">Select</option>
        <option value="Air">Air</option>
        <option value="Rail">Rail</option>
        <option value="Sea">Sea</option>
      </select>
      <input
        id="shipmentDepartureInput"
        placeholder="01/01/2021"
        className={clsx({ [styles.error]: errors.shipmentDepartureInput })}
      />
      <input
        id="shipmentArrivalInput"
        placeholder="01/01/2021"
        className={clsx({ [styles.error]: errors.shipmentArrivalInput })}
      />
      <select
        id="shipmentStatusSelect"
        className={clsx({ [styles.error]: errors.shipmentStatusSelect })}
      >
        <option value="">Select</option>
        <option value="Arrived">Arrived</option>
        <option value="TransportError">TransportError</option>
        <option value="In Transit">In Transit</option>
        <option value="Roll-Over">Roll-Over</option>
        <option value="Cancelled">Cancelled</option>
        <option value="Customs Hold">Customs Hold</option>
        <option value="TransportError">TransportError</option>
      </select>
      <div className="w-full flex">
        <button
          type="reset"
          className="mr-2 rounded-sm bg-white border text-black border-gray-700 px-2 py-3 my-2 hover:bg-gray-400 hover:text-white w-40"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-sm bg-blue-500 text-white px-2 py-3 my-2 hover:bg-blue-900 w-40"
        >
          Save
        </button>
      </div>
    </form>
  );
}
