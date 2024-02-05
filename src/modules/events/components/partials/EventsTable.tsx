import Routes from '@common/defs/routes';
import ItemsTable from '@common/components/partials/ItemsTable';
import { GridColumns } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import Namespaces from '@common/defs/namespaces';
import { CrudRow } from '@common/defs/types';
import useEvents, { CreateOneInput, UpdateOneInput } from '@modules/events/hooks/api/useEvents';
import { Event } from '@modules/events/defs/types';
import { EventsInputLabels } from '@modules/events/defs/labels';

interface Row extends CrudRow {
  name: string;
  description: string;
  maxNumParticipants: number;
  date: string;
  imageId?: number;
  categoryId: number;
  categoryName: string;
  statusName: string;
  city: string;
  country: string;
}

const EventsTable = () => {
  const columns: GridColumns<Row> = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'name',
      headerName: EventsInputLabels.name,
      flex: 1,
    },
    {
      field: 'date',
      headerName: EventsInputLabels.date,
      type: 'dateTime',
      flex: 1,
      renderCell: (params) => dayjs(params.row.date).format('DD/MM/YYYY hh:mm'),
    },
    {
      field: 'categoryName',
      headerName: EventsInputLabels.category,
      flex: 1,
    },
    {
      field: 'description',
      headerName: EventsInputLabels.description,
      flex: 1,
    },
    {
      field: 'maxNumParticipants',
      headerName: EventsInputLabels.maxNumParticipants,
      flex: 1,
    },
    {
      field: 'statusName',
      headerName: EventsInputLabels.status,
      type: 'string',
      flex: 1,
    },
    {
      field: 'startTime',
      headerName: EventsInputLabels.startTime,
      type: 'string',
      flex: 1,
    },
    {
      field: 'endTime',
      headerName: EventsInputLabels.endTime,
      type: 'string',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: EventsInputLabels.createdAt,
      type: 'dateTime',
      flex: 1,
      renderCell: (params) => dayjs(params.row.date).format('DD/MM/YYYY hh:mm'),
    },
  ];

  const itemToRow = (item: Event): Row => {
    return {
      id: item.id,
      name: item.name,
      createdAt: item.createdAt,
      description: item.description,
      maxNumParticipants: item.maxNumParticipants,
      date: item.date,
      imageId: item.imageId ? item.imageId : undefined,
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      statusName: item.statusName,
      city: item.location.city,
      country: item.location.country,
    };
  };

  return (
    <>
      <ItemsTable<Event, CreateOneInput, UpdateOneInput, Row>
        namespace={Namespaces.Events}
        routes={Routes.Events}
        useItems={useEvents}
        columns={columns}
        itemToRow={itemToRow}
        viewable
      />
    </>
  );
};

export default EventsTable;
