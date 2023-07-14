using SistemaMatricula.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;

namespace SistemaMatricula.Controllers
{
    public class AlumnoController : Controller
    {
        // GET: Alumno
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListarAlumnos()
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var lista = (from alumno in db.Alumno
                         where alumno.BHABILITADO.Equals(1)
                         select new
                         {
                             alumno.IIDALUMNO,
                             alumno.NOMBRE,
                             alumno.APPATERNO,
                             alumno.APMATERNO,
                             FECHANACIMIENTO=((DateTime)alumno.FECHANACIMIENTO).ToShortDateString(),
                             alumno.IIDSEXO,
                             alumno.TELEFONOPADRE
                         }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);

        }

        public JsonResult LlenarComboBoxSexo()
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var lista = (from sexo in db.Sexo
                         where sexo.BHABILITADO.Equals(1)
                         select new
                         {
                             sexo.IIDSEXO,
                             sexo.NOMBRE
                         }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BuscarAlumnoPorSexo(int IdSexo)
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var lista = (from alumno in db.Alumno
                         where alumno.BHABILITADO.Equals(1) && alumno.IIDSEXO.Equals(IdSexo)
                         select new
                         {
                             alumno.IIDALUMNO,
                             alumno.NOMBRE,
                             alumno.APPATERNO,
                             alumno.APMATERNO,
                             FECHANACIMIENTO= ((DateTime)alumno.FECHANACIMIENTO).ToShortDateString(),
                             alumno.IIDSEXO,
                             alumno.TELEFONOPADRE
                         }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RecuperarDatos(int id)
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var lista = (from alumno in db.Alumno
                         where alumno.BHABILITADO.Equals(1) && alumno.IIDALUMNO.Equals(id)
                         select new
                         {
                             alumno.IIDALUMNO,
                             alumno.NOMBRE,
                             alumno.APPATERNO,
                             alumno.APMATERNO,
                             FECHANACIMIENTO = ((DateTime)alumno.FECHANACIMIENTO).ToShortDateString(),
                             alumno.IIDSEXO,
                             alumno.TELEFONOPADRE

                         }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int Guardar(Alumno alumno)
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var numeroDeRegistrosAfectados = 0;
            try
            {
                if (alumno.IIDALUMNO==0)
                {
                    db.Alumno.InsertOnSubmit(alumno);
                    db.SubmitChanges();
                    numeroDeRegistrosAfectados = 1;
                }
                else
                {
                    Alumno seleccionado = db.Alumno.Where(a => a.IIDALUMNO.Equals(alumno.IIDALUMNO)).First();
                    seleccionado.IIDALUMNO = alumno.IIDALUMNO;
                    seleccionado.NOMBRE = alumno.NOMBRE;
                    seleccionado.APPATERNO = alumno.APPATERNO;
                    seleccionado.APMATERNO = alumno.APMATERNO;
                    seleccionado.FECHANACIMIENTO = alumno.FECHANACIMIENTO;
                    seleccionado.IIDSEXO = alumno.IIDSEXO;
                    seleccionado.TELEFONOPADRE = alumno.TELEFONOPADRE;
                    db.SubmitChanges();
                    numeroDeRegistrosAfectados = 1;
                }

            }catch(Exception ex)
            {
                numeroDeRegistrosAfectados = 0;
            }

            return numeroDeRegistrosAfectados;
        }

        public int Eliminar(Alumno alumno)
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var numeroDeRegistrosAfectados = 0;
            try
            {
                var seleccionado = db.Alumno.Where(a => a.IIDALUMNO.Equals(alumno.IIDALUMNO)).First();
                seleccionado.BHABILITADO = alumno.BHABILITADO = 0;
                db.SubmitChanges();
                numeroDeRegistrosAfectados = 1;

            }catch(Exception ex)
            {
                numeroDeRegistrosAfectados = 0;
            }
            return numeroDeRegistrosAfectados;
        }
    }
}