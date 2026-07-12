import { useEffect, useState } from "react";
import axios from "axios";

import MovieHeader from "../../Components/Admin/MovieHeader";
import MovieToolbar from "../../Components/Admin/MovieToolbar";
import MovieTable from "../../Components/Admin/MovieTable";
import MoviePagination from "../../Components/Admin/MoviePagination";
import MovieDetailModal from "../../Components/Admin/MovieDetailModal";
import MovieEditModal from "../../Components/Admin/MovieEditModal";
import GlobalLoading from "../../Components/Common/GlobalLoading";
import { useToast } from "../../Components/Common/ToastProvider";
import ConfirmDeleteModal from "../../Components/Admin/ConfirmDeleteModal";
import ActorMovieModal from "../../Components/Admin/ActorMovieModal";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);

  const [openDetail, setOpenDetail] = useState(false);
  const [movieDetail, setMovieDetail] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [categories, setCategories] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteMovieId, setDeleteMovieId] = useState(null);

  const [openActor, setOpenActor] = useState(false);
  const [movieActorId, setMovieActorId] = useState(null);
  const [actors, setActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);

  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/api/movie?pageNo=${page}`,
      );

      setMovies(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Xem chi tiết
  const handleViewMovie = async (idMovie) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/api/movie/id-movie=${idMovie}`,
      );

      setMovieDetail(res.data.data);
      setOpenDetail(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Mở modal sửa
  const handleEditMovie = async (idMovie) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3000/api/movie/id-movie=${idMovie}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data.data);

      setEditMovie(res.data.data);
      setOpenEdit(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật phim
  const handleUpdateMovie = async (movie) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("idMovie", movie.idMovie);
      formData.append("nameMovie", movie.nameMovie);
      formData.append("director", movie.director);
      formData.append("duration", movie.duration);
      formData.append("releaseDate", movie.releaseDate);
      formData.append("language", movie.language);
      formData.append("rated", movie.rated);
      formData.append("shortDescription", movie.shortDescription);
      formData.append("trailer", movie.trailer);
      formData.append("idCategory", movie.idCategory);
      formData.append("showing", movie.showing);

      // chỉ gửi nếu người dùng chọn ảnh mới
     if (movie.smallImage instanceof File) {
       formData.append("smallImage", movie.smallImage);
     } else if (movie.smallImage) {
       const blob = await fetch(
         `data:image/jpeg;base64,${movie.smallImage}`,
       ).then((r) => r.blob());

       formData.append("smallImage", blob, "poster.jpg");
     }

     if (movie.largeImage instanceof File) {
       formData.append("largeImage", movie.largeImage);
     } else if (movie.largeImage) {
       const blob = await fetch(
         `data:image/jpeg;base64,${movie.largeImage}`,
       ).then((r) => r.blob());

       formData.append("largeImage", blob, "banner.jpg");
     }

      await axios.put("http://localhost:3000/api/admin/movie", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      showToast("Cập nhật thành công!", "success");
      setOpenEdit(false);
      setEditMovie(null);

      fetchMovies();
    } catch (err) {
      console.error(err);
      showToast("Cập nhật không thành công!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/category");
      setCategories(res.data.data || []);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFilter = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/api/movie?pageNo=${page}`,
      );

      let data = res.data.data || [];

      // Tên phim
      if (keyword.trim() !== "") {
        data = data.filter((movie) =>
          movie.nameMovie.toLowerCase().includes(keyword.toLowerCase()),
        );
      }

      // Thể loại
      if (category !== "") {
        data = data.filter(
          (movie) => Number(movie.idCategory) === Number(category),
        );
      }

      // Trạng thái
      if (status !== "") {
        data = data.filter((movie) => Number(movie.showing) === Number(status));
      }

      setMovies(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMovie = (idMovie) => {
    setDeleteMovieId(idMovie);
    setOpenDelete(true);
  };

  const confirmDeleteMovie = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/admin/movie/id-movie=${deleteMovieId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Xóa phim thành công!", "success");

      setOpenDelete(false);
      setDeleteMovieId(null);

      fetchMovies();
    } catch (err) {
      console.error(err);
      showToast("Xóa phim thất bại!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleActorMovie = async (idMovie) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:3000/api/admin/actor/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const actorList = res.data.data || [];

      // lấy id actor đã đóng phim này
      const selected = [];

      actorList.forEach((actor) => {
        const movie = actor.actorMovieDTOS?.find((m) => m.idMovie === idMovie);

        if (movie) {
          selected.push({
            idActor: actor.idActor,
            is_main: movie._main,
          });
        }
      });

      setSelectedActors(selected);

      setActors(actorList);
      setSelectedActors(selected);

      setMovieActorId(idMovie);
      setOpenActor(true);
    } catch (err) {
      console.log(err);
      showToast("Không tải được danh sách diễn viên!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveActors = async (selected) => {
    try {
      setLoading(true);

      console.log(selected);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/admin/movie/actor",
        {
          idMovie: movieActorId,
          addMovieActorRequests: selected,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Cập nhật diễn viên thành công!", "success");

      setOpenActor(false);
      setSelectedActors([]);
      setMovieActorId(null);
    } catch (err) {
      console.log(err);
      showToast("Cập nhật thất bại!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = async (movie) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      // Không cần idMovie vì thêm mới
      formData.append("nameMovie", movie.nameMovie);
      formData.append("director", movie.director);
      formData.append("duration", movie.duration);

      // Backend yêu cầu dd-MM-yyyy
      const formatDate = (date) => {
        if (!date) return "";

        // nếu đã đúng định dạng thì trả luôn
        if (date.includes("-") && date.split("-")[0].length === 2) {
          return date;
        }

        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
      };

      formData.append("releaseDate", formatDate(movie.releaseDate));

      formData.append("language", movie.language);
      formData.append("rated", movie.rated);

      // đúng tên field backend
      formData.append("isShowing", movie.isShowing);

      formData.append("shortDescription", movie.shortDescription);
      formData.append("trailer", movie.trailer);
      formData.append("idCategory", movie.idCategory);

      // Poster
      if (movie.smallImage instanceof File) {
        formData.append("smallImage", movie.smallImage);
      }

      // Banner
      if (movie.largeImage instanceof File) {
        formData.append("largeImage", movie.largeImage);
      }

      await axios.post("http://localhost:3000/api/admin/movie", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      showToast("Thêm phim thành công!", "success");

      setOpenAdd(false);

      await fetchMovies();
    } catch (err) {
      console.log(err);

      if (err.response) {
        console.log(err.response.data);
      }

      showToast("Thêm phim thất bại!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <MovieHeader onAdd={() => setOpenAdd(true)} />

        <MovieToolbar
          keyword={keyword}
          setKeyword={setKeyword}
          categories={categories}
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
          onFilter={handleFilter}
        />

        <MovieTable
          movies={movies}
          loading={loading}
          onView={handleViewMovie}
          onEdit={handleEditMovie}
          onDelete={handleDeleteMovie}
          onActor={handleActorMovie}
        />

        <MoviePagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>

      <MovieDetailModal
        open={openDetail}
        movie={movieDetail}
        onClose={() => setOpenDetail(false)}
      />

      <MovieEditModal
        open={openEdit}
        movie={editMovie}
        onClose={() => setOpenEdit(false)}
        onSave={handleUpdateMovie}
      />

      <ConfirmDeleteModal
        open={openDelete}
        title="Xóa phim"
        message="Bạn có chắc chắn muốn xóa phim này? Sau khi xóa sẽ không thể khôi phục."
        loading={loading}
        onCancel={() => {
          setOpenDelete(false);
          setDeleteMovieId(null);
        }}
        onConfirm={confirmDeleteMovie}
      />

      <ActorMovieModal
        open={openActor}
        actors={actors}
        selectedActors={selectedActors}
        loading={loading}
        onClose={() => setOpenActor(false)}
        onSave={handleSaveActors}
      />

      <MovieEditModal
        open={openAdd}
        movie={null}
        mode="add"
        onClose={() => setOpenAdd(false)}
        onSave={handleAddMovie}
      />

      <GlobalLoading open={loading} text="Đang xử lý..." />
    </>
  );
}
