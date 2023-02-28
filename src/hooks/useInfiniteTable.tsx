import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import i18n from 'i18next'
import { useTranslation } from 'react-i18next'
import { ExportToCsv, Options } from 'export-to-csv'
import { UseInfiniteQueryResult } from 'react-query'
import { Box, Button, Typography } from '@mui/material'

import FileDownloadIcon from '@mui/icons-material/FileDownload'

import type {
  MRT_ColumnFiltersState,
  MRT_SortingState,
  MRT_VisibilityState,
  MRT_DensityState,
} from 'material-react-table'
import {
  MaterialReactTableProps,
  MRT_TableInstance,
  MRT_ToggleFiltersButton,
} from 'material-react-table'
import { MRT_Localization_FR } from 'material-react-table/locales/fr'
import { MRT_Localization_EN } from 'material-react-table/locales/en'

import { PagninatedQuery } from '@Type/fetch'

type FetchHook<T> = (
  columnFilters?: MRT_ColumnFiltersState,
  sorting?: MRT_SortingState
) => UseInfiniteQueryResult<PagninatedQuery<T>>

export const useInfiniteTable = <T extends Record<string, unknown>>(
  useFetchHook: FetchHook<T>,
  csvOptions?: Options
) => {
  const { t } = useTranslation('common')

  const tableContainerRef = useRef<HTMLDivElement>(null)
  const tableInstanceRef = useRef<MRT_TableInstance<T>>(null)
  const virtualizerInstanceRef: MaterialReactTableProps['rowVirtualizerInstanceRef'] =
    useRef(null)

  //we will also need some weird re-render hacks to force the MRT_ components to re-render since ref changes do not trigger a re-render
  const rerender = useReducer(() => ({}), {})[1]

  //we need to manage the state that should trigger the MRT_ components in our custom toolbar to re-render
  const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>(
    {}
  )
  const [density, setDensity] = useState<MRT_DensityState>('comfortable')
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [sorting, setSorting] = useState<MRT_SortingState>([])

  const { data, fetchNextPage, isError, isFetching, isLoading } = useFetchHook(
    columnFilters,
    sorting
  )

  const flatData = useMemo(
    () => data?.pages.flatMap(page => page['hydra:member']) ?? [],
    [data]
  )

  const totalDBRowCount = data?.pages?.[0]['hydra:totalItems'] ?? 0
  const totalFetched = flatData.length

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement
        //once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 400 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage()
        }
      }
    },
    [fetchNextPage, isFetching, totalDBRowCount, totalFetched]
  )

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current)
  }, [fetchMoreOnBottomReached, tableContainerRef])

  useEffect(() => {
    if (flatData.length !== 0 && virtualizerInstanceRef.current) {
      virtualizerInstanceRef.current.scrollToIndex(0)
    }
  }, [sorting, columnFilters, flatData.length])

  const csvExporter = new ExportToCsv(csvOptions)

  return {
    tableInstanceRef,
    flatData,
    tableProps: {
      enableColumnActions: false,
      enablePagination: false,
      enableRowSelection: true,
      enableRowVirtualization: true,
      enableColumnOrdering: true,
      manualFiltering: true,
      manualSorting: true,
      muiTableContainerProps: {
        ref: tableContainerRef, //get access to the table container element
        sx: { maxHeight: '600px' }, //give the table a max height
        onScroll: event =>
          fetchMoreOnBottomReached(event.target as HTMLDivElement),
      },
      muiToolbarAlertBannerProps: isError
        ? {
            color: 'error',
            children: 'Error loading data',
          }
        : undefined,
      onColumnVisibilityChange: updater => {
        setColumnVisibility(prev =>
          updater instanceof Function ? updater(prev) : updater
        )
        queueMicrotask(rerender) //hack to rerender after state update
      },
      onDensityChange: updater => {
        setDensity(prev =>
          updater instanceof Function ? updater(prev) : updater
        )
        queueMicrotask(rerender) //hack to rerender after state update
      },
      onColumnFiltersChange: setColumnFilters,
      onSortingChange: setSorting,
      state: {
        columnVisibility,
        density,
        columnFilters,
        isLoading,
        showAlertBanner: isError,
        showProgressBars: isFetching,
        sorting,
      },
      renderToolbarInternalActions: ({ table }) => (
        <>
          <MRT_ToggleFiltersButton table={table} />
        </>
      ),
      renderTopToolbarCustomActions: ({ table }) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 40,
            paddingInline: 1,
            gap: 2,
          }}
        >
          {table.getIsSomeRowsSelected() || table.getIsAllPageRowsSelected() ? (
            <>
              <Typography variant="body2" component="div">
                {t('table.selected', {
                  selected: table.getSelectedRowModel().rows.length,
                })}
              </Typography>
              {csvOptions && (
                <Button
                  onClick={() =>
                    csvExporter.generateCsv(
                      table.getSelectedRowModel().rows.map(row => row.original)
                    )
                  }
                  size="small"
                  startIcon={<FileDownloadIcon />}
                >
                  {t('table.exportSelected')}
                </Button>
              )}
            </>
          ) : (
            <Typography variant="body2" component="div">
              {t('table.fetchedTotal', { totalFetched, totalDBRowCount })}
            </Typography>
          )}
        </Box>
      ),
      positionToolbarAlertBanner: 'none',
      enableBottomToolbar: false,
      tableInstanceRef,
      rowVirtualizerInstanceRef: virtualizerInstanceRef,
      rowVirtualizerProps: { overscan: 4 },
      localization:
        i18n.language === 'en' ? MRT_Localization_EN : MRT_Localization_FR,
    } as Partial<Omit<MaterialReactTableProps<T>, 'columns' | 'data'>>,
  }
}
