import React, { useEffect, useState } from "react";
import "./Lish.css";
import Img from "./img/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg";

const List = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const storedList = localStorage.getItem("todoList");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAdd = () => {
    if (task.trim() !== "") {
      setList([...list, { id: list.length + 1, name: task, status: false }]);
      setTask("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };

  const handleDelete = (index) => {
    const itemToDelete = list[index].name;

    const isConfirmed = window.confirm(
      `Bạn có muốn xóa "${itemToDelete}" không?`
    );

    if (isConfirmed) {
      const newList = [...list];
      newList.splice(index, 1);
      setList(newList);
    }
  };

  const handleFix = (index) => {
    setEditIndex(index);
    setEditValue(list[index].name);
  };

  const handleSave = () => {
    if (editIndex !== null && editValue.trim() !== "") {
      const newList = [...list];
      newList[editIndex].name = editValue;
      setList(newList);
      setEditIndex(null);
      setEditValue("");
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="list-container">
          <h3>Danh sách công việc</h3>
          <div className="task-input">
            <input
              type="text"
              placeholder="Nhập Thêm công việc"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="input-list"
            />
            <button type="submit">Thêm</button>
          </div>

          <div className="item-input">
            {list.length === 0 ? ( // Kiểm tra nếu danh sách rỗng
              <img src={Img} alt="Empty list" /> // Hiển thị hình ảnh khi rỗng
            ) : (
              <>
                {list.map((item, index) => (
                  <div key={index} className="task-item">
                    {editIndex === index ? (
                      <div className="edit-mode">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="edit-input"
                        />
                        <button onClick={handleSave} className="edit-buttons">
                          Lưu
                        </button>
                        <button onClick={handleCancel} className="edit-buttons">
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <>
                        <input
                          type="checkbox"
                          checked={item.status}
                          className="checkbox"
                          onChange={() => {
                            const newList = [...list];
                            newList[index].status = !newList[index].status;
                            setList(newList);
                          }}
                        />

                        <p
                          style={{
                            textDecoration: item.status
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {item.name}
                        </p>
                        <button
                          className="btn-detele"
                          onClick={() => handleDelete(index)}
                        >
                          Xóa
                        </button>
                        <button onClick={() => handleFix(index)}>Sửa</button>
                      </>
                    )}
                  </div>
                ))}
                {!list.every((item) => item.status) && (
                  <p className="p">
                    Công việc đã hoàn thành:{" "}
                    {list.filter((item) => item.status).length} / {list.length}
                  </p>
                )}
                {list.every((item) => item.status) && (
                  <p className="p">Tất cả công việc đã hoàn thành</p>
                )}
              </>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default List;
