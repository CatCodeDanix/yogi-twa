import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import { LABELS } from '../constants/dictionary';
import type { Yogi as YogiType } from '../types';

interface YogiProps {
  yogi: YogiType;
}

export default function Yogi({ yogi }: YogiProps) {
  return (
    <>
      <Table hideHeader aria-label="Yogi Table">
        <TableHeader>
          <TableColumn>Item</TableColumn>
          <TableColumn>Desc</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>{LABELS.yogiPoint}</TableCell>
            <TableCell>{yogi.yogiPoint}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>{LABELS.nak}</TableCell>
            <TableCell>{yogi.nak}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>{LABELS.yPlanet}</TableCell>
            <TableCell>{yogi.yPlanet}</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>{LABELS.ayPlanet}</TableCell>
            <TableCell>{yogi.ayPlanet}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div>{yogi.desription}</div>
    </>
  );
}
