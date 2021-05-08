/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { MouseEventHandler } from 'react';
import { ShipmentType } from 'data/shipmentdata';
import { v1 as uuidv1 } from 'uuid';

import styles from './Card.module.css';

type CardProps = {
  title: string;
  cardGroup: Record<string, Array<ShipmentType>>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  itemsCount?: number;
};

export default function Card(props: CardProps): JSX.Element {
  const { title, cardGroup, onClick, itemsCount } = props;
  return (
    <div
      className={styles.CardContainer}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <h3>{title}</h3>
      <div className="flex flex-col">
        {Object.keys(cardGroup)
          .slice(0, itemsCount || 3)
          .map((key) => (
            <span key={uuidv1()} className="text-sm">
              {key}: {cardGroup[key].length}
            </span>
          ))}
        <span className="flex justify-end">
          view more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
