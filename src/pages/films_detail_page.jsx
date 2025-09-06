import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import Loading from '../components/loading';
import { getFilmById } from '../firebase/firebase';

function FilmsDetailPage() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        setLoading(true);
        const filmData = await getFilmById(id);
        setFilm(filmData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFilm();
    }
  }, [id]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <Link to="/">
            <Button className="mt-4">Back to Films</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!film) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Film Not Found</h2>
          <Link to="/">
            <Button>Back to Films</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link to="/">
          <Button variant="outline" className="mb-4">
            ← Back to Films
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Film Poster */}
        <div className="md:col-span-1">
          {film.image ? (
            <img
              src={film.image}
              alt={film.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>

        {/* Film Details */}
        <div className="md:col-span-2">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {film.name}
              </h1>
              {film.nameUz && (
                <h2 className="text-2xl text-gray-700 mb-4">
                  {film.nameUz}
                </h2>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Year</h3>
                <p className="text-gray-900">{film.year}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Country</h3>
                <Badge colorScheme="purple">{film.country}</Badge>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Duration</h3>
                <p className="text-gray-900">{film.duration} minutes</p>
              </div>
              {film.episodes && (
                <div>
                  <h3 className="font-semibold text-gray-700">Episodes</h3>
                  <p className="text-gray-900">{film.episodes}</p>
                </div>
              )}
            </div>

            {film.description && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-900 leading-relaxed">
                  {film.description}
                </p>
              </div>
            )}

            {film.imdbLink && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">IMDb</h3>
                <a
                  href={film.imdbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  View on IMDb
                </a>
              </div>
            )}

            <div className="pt-6 border-t">
              <div className="flex gap-4">
                <Link to="/">
                  <Button variant="outline">Back to Films</Button>
                </Link>
                {film.imdbLink && (
                  <a
                    href={film.imdbLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-yellow-500 text-white">
                      View on IMDb
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmsDetailPage;