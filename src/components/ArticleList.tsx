import * as React from 'react';
import { useState } from 'react';
import { Paper, Box, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { Article as ArticleIcon, SearchOutlined } from '@mui/icons-material';

type Article = {
  id: number;
  title: string;
  date: string;
};

type Props = {
  articles: Article[];
  exportAllToCsv: (data: Article[]) => void;
};

const ArticleList: React.FC<Props> = ({ articles, exportAllToCsv }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articles.filter((article) =>
    article.date === new Date().toISOString().slice(0, 10)
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleExportAllToCsv = () => {
    exportAllToCsv(filteredArticles);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 1,
        my: 6,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        justifyContent: 'space-around',
      }}
    >
      <Box>
        <Typography
          variant="h6"
          align="left"
          sx={{ fontSize: { xs: '1.2rem', md: '2rem' }, mb: { xs: 2, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}
        >
          Commesse generate oggi
        </Typography>

        {filteredArticles.length > 0 && (
          <Button
            variant="contained"
            color="secondary"
            sx={{
              bgcolor: 'green',
              '&:hover': { bgcolor: 'darkgreen' },
              fontSize: { xs: 'small' },
              width: { xs: '100%', md: '300px' },
            }}
            startIcon={<ArticleIcon />}
            onClick={handleExportAllToCsv}
          >
            <Typography sx={{ fontSize: { xs: 'small' } }}>Esporta tutti in CSV</Typography>
          </Button>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 2, md: 0 } }}>
        <TextField
          id="search"
          label="Cerca"
          variant="outlined"
          color="primary"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: { xs: '100%', md: '100%' }, mt: { xs: 2, md: 0 }, ml: { md: 2 } }}
        />
      </Box>
    </Paper>
  );
};

export default ArticleList;
