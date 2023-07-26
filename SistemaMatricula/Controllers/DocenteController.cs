using SistemaMatricula.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaMatricula.Controllers
{
    public class DocenteController : Controller
    {
        // GET: Docente
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ObtenerDocentes()
        {
            
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var lista = (from docente in db.Docente
                         where docente.BHABILITADO.Equals(1)
                         select new
                         {
                             docente.IIDDOCENTE,
                             docente.NOMBRE,
                             docente.APMATERNO,
                             docente.APPATERNO,
                             docente.DIRECCION,
                             docente.TELEFONOFIJO,
                             docente.TELEFONOCELULAR,
                             docente.EMAIL,
                             docente.IIDSEXO,
                             FECHACONTRATO = ((DateTime)docente.FECHACONTRATO).ToShortDateString(),
                             docente.IIDMODALIDADCONTRATO,
                             FOTO = Convert.ToBase64String(docente.FOTO.ToArray())
                         }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LlenarComboModalidadContrato()
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var lista = db.ModalidadContrato.Where(o =>o.BHABILITADO==1)
                .Select(o => new { o.IIDMODALIDADCONTRATO, o.NOMBRE }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FiltrarDocentePorTipoModalidad(int idModalidad)
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var lista = (from docente in db.Docente
                         where docente.IIDMODALIDADCONTRATO == idModalidad
                         select new
                         {
                             docente.IIDDOCENTE,
                             docente.NOMBRE,
                             docente.APMATERNO,
                             docente.APPATERNO,
                             docente.DIRECCION,
                             docente.TELEFONOFIJO,
                             docente.TELEFONOCELULAR,
                             docente.EMAIL,
                             docente.IIDSEXO,
                             FECHACONTRATO=((DateTime)docente.FECHACONTRATO).ToShortDateString(),
                             docente.IIDMODALIDADCONTRATO
                         }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ObtenerListaSexo()
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var lista = (from sexo in db.Sexo
                         where sexo.IIDSEXO != 0
                         select new
                         {
                             sexo.IIDSEXO,
                             sexo.NOMBRE
                         }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RecuperarDatos(int id)
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var list = (from docente in db.Docente
                        where docente.IIDDOCENTE.Equals(id)
                        select new
                        {
                            docente.IIDDOCENTE,
                            docente.NOMBRE,
                            docente.APMATERNO,
                            docente.APPATERNO,
                            docente.DIRECCION,
                            docente.TELEFONOFIJO,
                            docente.TELEFONOCELULAR,
                            docente.EMAIL,
                            docente.IIDSEXO,
                            FECHACONTRATO=((DateTime)docente.FECHACONTRATO).ToShortDateString(),
                            docente.IIDMODALIDADCONTRATO,
                            FOTO= Convert.ToBase64String(docente.FOTO.ToArray())
                        }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public int Guardar(Docente docente, string cadenaFoto)
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            int numeroDeRegistrosAfectados = 0;

            try
            {
                if (docente.IIDDOCENTE==0)
                {
                    docente.FOTO = Convert.FromBase64String(cadenaFoto);
                    db.Docente.InsertOnSubmit(docente);
                    db.SubmitChanges();
                    numeroDeRegistrosAfectados = 1;
                }
                else
                {
                    var seleccionado = db.Docente.Where(d => d.IIDDOCENTE.Equals(docente.IIDDOCENTE)).First();
                    seleccionado.IIDDOCENTE = docente.IIDDOCENTE;
                    seleccionado.NOMBRE= docente.NOMBRE;
                    seleccionado.APMATERNO = docente.APMATERNO;
                    seleccionado.APPATERNO = docente.APPATERNO;
                    seleccionado.DIRECCION = docente.DIRECCION;
                    seleccionado.TELEFONOFIJO = docente.TELEFONOFIJO;
                    seleccionado.TELEFONOCELULAR = docente.TELEFONOCELULAR;
                    seleccionado.EMAIL = docente.EMAIL;
                    seleccionado.IIDSEXO = docente.IIDSEXO;
                    seleccionado.FECHACONTRATO = docente.FECHACONTRATO;
                    seleccionado.IIDMODALIDADCONTRATO= docente.IIDMODALIDADCONTRATO;
                    seleccionado.FOTO = Convert.FromBase64String(cadenaFoto);
                    db.SubmitChanges();
                    numeroDeRegistrosAfectados = 1;
                }
            }catch(Exception ex)
            {
                numeroDeRegistrosAfectados = 0;
            }
            return numeroDeRegistrosAfectados;
        }

        public int Eliminar(Docente docente)
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var registrosAfectados = 0;
            try
            {
                var seleccionado = db.Docente.Where(d => d.IIDDOCENTE.Equals(docente.IIDDOCENTE)).First();
                seleccionado.BHABILITADO = docente.BHABILITADO = 0;
                db.SubmitChanges();
                registrosAfectados = 1;

            }catch(Exception ex)
            {
                registrosAfectados = 0;
            }
            return registrosAfectados;
        }
    }
}