using System;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class LopHocController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/LopHoc
        public System.Object GetLopHocs()
        {
            var result = (from a in db.LopHocs
                          select new
                          {
                              a.MaLop,
                              a.TenLop,
                              a.SiSo
                          }).ToList();

            return result;
        }

        // GET: api/LopHoc/5
        [ResponseType(typeof(LopHoc))]
        public IHttpActionResult GetLopHoc(int id)
        {
            var lophoc = (from a in db.LopHocs
                          where a.MaLop == id

                          select new
                          {
                              a.MaLop,
                              a.TenLop,
                              a.SiSo,
                              DeletedHocSinh = ""
                          }).FirstOrDefault();

            var hocsinhList = (from a in db.HocSinhs
                               join b in db.LopHocs on a.MaLop equals b.MaLop
                               where a.MaLop == id

                               select new
                               {
                                   a.MaHocSinh,
                                   a.MaLop,
                                   a.HoTen,
                                   a.Email,
                                   a.DiaChi,
                                   a.NgaySinh,
                                   a.GioiTinh,
                               }).ToList();


            return Ok(new { lophoc, hocsinhList });

        }
        


        [HttpPost]
        [Route("api/PostLopHoc")]
        [ResponseType(typeof(LopHoc))]
        public IHttpActionResult SaveLopHocWithStudents(LopHoc lopHoc)
        {
            try
            {

                int siso = lopHoc.HocSinhs.Count();
                lopHoc.SiSo = siso;

                if (lopHoc.MaLop == 0)
                {
                    db.LopHocs.Add(lopHoc);
                }
                else
                {
                    db.Entry(lopHoc).State = EntityState.Modified;
                }

                foreach (var item in lopHoc.HocSinhs)
                {
                    if (item.MaHocSinh == 0)
                    {
                        db.HocSinhs.Add(item);
                    }
                    else
                    {
                        db.Entry(item).State = EntityState.Modified;
                    }
                }

                foreach (var item in lopHoc.DeletedHocSinh.Split(',').Where(x => x != ""))
                {
                    HocSinh x = db.HocSinhs.Find(Convert.ToInt64(item));
                    db.HocSinhs.Remove(x);
                }

                db.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        // PUT: api/LopHoc/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLopHoc(int id, LopHoc lopHoc)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != lopHoc.MaLop)
            {
                return BadRequest();
            }

            db.Entry(lopHoc).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LopHocExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/LopHoc
        [ResponseType(typeof(LopHoc))]
        public IHttpActionResult PostLopHoc(LopHoc lopHoc)
        {
            db.LopHocs.Add(lopHoc);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = lopHoc.MaLop }, lopHoc);

        }

        // DELETE: api/LopHoc/5
        [ResponseType(typeof(LopHoc))]
        public IHttpActionResult DeleteLopHoc(int id)
        {
            LopHoc lopHoc = db.LopHocs.Include(y => y.HocSinhs)
                 .SingleOrDefault(x => x.MaLop == id);

            foreach (var item in lopHoc.HocSinhs.ToList())
            {
                db.HocSinhs.Remove(item);
            }

            db.LopHocs.Remove(lopHoc);
            db.SaveChanges();

            return Ok(lopHoc);

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LopHocExists(int id)
        {
            return db.LopHocs.Count(e => e.MaLop == id) > 0;
        }
    }
}