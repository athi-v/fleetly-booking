import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { equipment, categories } from '../booking/data/equipment';
import EquipmentCard from '../booking/components/EquipmentCard';

const PAGE_SIZE = 6;

export default function EquipmentPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return equipment.filter((e) => {
      const matchesCategory = activeCategory === 'All' || e.category === activeCategory;
      const matchesSearch =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.model.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setPage(1);
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Plant Hire Equipment
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Browse our fleet and add machines to your hire booking.
      </Typography>

      {/* Search + category row */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search by name, model or category…"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          size="small"
          sx={{ maxWidth: 360 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          {['All', ...categories].map((cat) => (
            <Chip
              key={cat}
              label={cat}
              clickable
              color={activeCategory === cat ? 'primary' : 'default'}
              variant={activeCategory === cat ? 'filled' : 'outlined'}
              onClick={() => handleCategoryChange(cat)}
            />
          ))}
        </Box>
      </Box>

      {/* Result count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {filtered.length} item{filtered.length !== 1 ? 's' : ''} found
      </Typography>

      {/* Equipment grid */}
      {paginated.length > 0 ? (
        <Grid container spacing={3}>
          {paginated.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <EquipmentCard equipment={item} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography color="text.secondary">No equipment matches your search.</Typography>
        </Box>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_e, val) => setPage(val)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}
