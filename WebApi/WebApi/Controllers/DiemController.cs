using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class DiemController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Diem
        public System.Object GetDiems()
        {
            var result = (from a in db.Diems
                          join b in db.HocKies on a.MaHocKy equals b.MaHocKy
                          join c in db.MonHocs on a.MaMon equals c.MaMonHoc
                          join d in db.HocSinhs on a.MaHocSinh equals d.MaHocSinh
                          join e in db.LopHocs on d.MaLop equals e.MaLop

                          select new
                          {
                              a.MaDiem,
                              a.MaHocSinh,
                              a.MaHocKy,
                              a.MaMon,
                              a.DiemTB,
                              TenLopHoc = e.TenLop,
                              HocKy = b.TenHocKy
                          }).ToList();

            return result;
        }

        // GET: api/Diem/5
        [ResponseType(typeof(Diem))]
        public IHttpActionResult GetDiem(int id)
        {
            var bangdiem = (from a in db.Diems
                            join b in db.HocSinhs on a.MaHocSinh equals b.MaHocSinh
                            join c in db.LopHocs on b.MaLop equals c.MaLop

                            where a.MaDiem == id

                            select new
                            {
                                 a.MaDiem,
                                 a.MaHocKy,
                                 a.MaHocSinh,
                                 a.MaMon,
                                 c.MaLop
                            }).FirstOrDefault();

            var ctBangDiem = (from a in db.CTDiems
                              join b in db.Diems on a.MaDiem equals b.MaDiem
                              join c in db.HocSinhs on b.MaHocSinh equals c.MaHocSinh


                              where a.MaDiem == id

                              select new
                              {
                                  a.MaCTDiem,
                                  a.MaDiem,
                                  c.HoTen,
                                  a.Diem15Phut,
                                  a.Diem1Tiet,
                                  a.DiemTB
                              }).ToList();


            return Ok(new { bangdiem, ctBangDiem });
        }

        // POST: api/Diem
        [ResponseType(typeof(Diem))]
        public IHttpActionResult PostDiem(Diem diem)
        {
            try
            {
                if (diem.MaDiem == 0)
                {
                    db.Diems.Add(diem);
                }
                else
                {
                    db.Entry(diem).State = EntityState.Modified;
                }

                foreach (var item in diem.CTDiems)
                {
                    if (item.MaCTDiem == 0)
                    {
                        db.CTDiems.Add(item);
                    }
                    else
                    {
                        db.Entry(item).State = EntityState.Modified;
                    }
                }

                foreach (var item in diem.DeletedCTBangDiem.Split(',').Where(x => x != ""))
                {
                    CTDiem x = db.CTDiems.Find(Convert.ToInt64(item));
                    db.CTDiems.Remove(x);
                }

                db.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // DELETE: api/Diem/5
        [ResponseType(typeof(Diem))]
        public IHttpActionResult DeleteDiem(int id)
        {
            Diem diem = db.Diems.Find(id);
            if (diem == null)
            {
                return NotFound();
            }

            db.Diems.Remove(diem);
            db.SaveChanges();

            return Ok(diem);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DiemExists(int id)
        {
            return db.Diems.Count(e => e.MaDiem == id) > 0;
        }
    }
}